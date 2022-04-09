const express = require("express");
const router = express.Router();

const { Post, User, Image, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares"); // 로그인 검증

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // 로그인 후에 라우터에 접근할 때 deserializeUser가 실행되어 req.user을 가져올수 있음 * passport
    });
    const fullPost = await Post.findOne({
      // 정보를 완성해서 프론트로 돌려준다.
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost); // 프론트로 돌려준다
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  console.log(req.params);
  // try {
  //   // 실제로 게시글이 존재하는지 검사를 해야한다. 꼼꼼하게~검사필요
  //   const post = await Post.findOne({
  //     where: { id: req.params.postId },
  //   });
  //   if (!post) {
  //     return res.status(403).send("존재하지 않는 게시글입니다."); // return 꼭 붙이기. 요청 1번엔 응답 1번
  //   }
  //   const comment = await Comment.create({
  //     content: req.body.content,
  //     postId: req.params.postId,
  //     UserId: req.user.id,
  //   });
  //   res.status(201).json(comment);
  // } catch (error) {
  //   console.log(error);
  //   next(error);
  // }
});
router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
