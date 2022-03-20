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
    try {
      const user = await User.findOn({
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
