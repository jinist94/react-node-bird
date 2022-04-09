const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  // passport 설정
  passport.serializeUser((user, done) => {
    done(null, user.id); // 서버에 id만 저장
  });

  passport.deserializeUser(async (id, done) => {
    //여기서 id는 serializeUser의 done에서 보낸 user.id
    // 라우터에 접근하게 되면 deserializeUser를 실행해서 저장했던 id를 통해서 사용자 정보를 복구하여 req.user에 담는다.
    try {
      const user = await User.findOne({
        where: { id },
      });
      done(null, user); // req.user
    } catch (error) {
      console.log(error);
      done(error);
    }
  });

  local();
};
