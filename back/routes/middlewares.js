exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    // next()의기능.
    // ()안에 무엇이라도 넣으면 에러처리
    // 그냥 next()로 하면 다음 미들웨어로 넘어감
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
    // next()의기능.
    // ()안에 무엇이라도 넣으면 에러처리
    // 그냥 next()로 하면 다음 미들웨어로 넘어감
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
