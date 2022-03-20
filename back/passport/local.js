const passport = require("passport");
const { Strategy: LocalStragy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStragy(
      {
        // req.body에 대한 설정
        usernameField: "email", // req.body.email
        passwordField: "password", // req.body.password
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 이메일입니다." }); // 클라이언트에서 실패
            // passpord에서는 응답을 보내지 않고 done을 보낸다.
            // 첫번째 인자 서버에러, 두 번째 인자 성공여부, 세 번째 인자 클라이언트 에러
            // 이 세가지의 매개변수들은 err, user, info로 전달된다.
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user); // 로그인 성공
          }
          return done(null, false, { reason: "비밀번호가 일치하지 않습니다." }); // 클라이언트에서 실패
        } catch (error) {
          // 서버 에러 시
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
