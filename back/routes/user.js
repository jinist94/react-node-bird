const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, Post } = require("../models");
// models/index.js에서 내보낸 db안의 User을 가져온다 == User의 모델(table)을 가져오는 것
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const passport = require("passport");
const db = require("../models");

router.post(
  // POST /user/login
  "/login",
  isNotLoggedIn,
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      // err: 에러, user: 성공객체, info
      if (err) {
        console.log(error);
        return next(error);
      }
      if (info) {
        // client 에러
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.log(loginErr);
          return next(loginErr);
        }
        // res.setHeader('Cookie', 랜덤생성한 세션id)
        const userData = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ["password"], // user데이터에서 password만 빼고 가져오기
          },
          include: [
            // 추가로 포함시킬 데이터, as를 사용했을 경우 as정보도 입력해주어야 한다.
            { model: db.Post },
            { model: db.User, as: "Followings" },
            { model: db.User, as: "Followers" },
          ], // Post
        });
        return res.status(200).json(userData);
      });
    })(req, res, next);
  }
);

router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      // 기존의 유저 중 해당 email을 사용하는 유저가 있는지 확인
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 이메일입니다."); // return 붙이기, 이 부분이 saga의 error.response.data가 됨
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      // table안에 데이터 삽입 / 비동기함수기 때문에  await 사용
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error); // status(500)
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy(); // 세션에 저장된 쿠키와 아이디 삭제
  res.status(200).send("ok");
});

module.exports = router;
