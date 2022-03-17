const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");
// models/index.js에서 내보낸 db안의 User을 가져온다 == User의 모델(table)을 가져오는 것

router.post("/", async (req, res, next) => {
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

module.exports = router;
