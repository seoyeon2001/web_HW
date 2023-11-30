const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  // const token = req.headers.authorization; 
  // console.log(`미들웨어에서 확인한 토큰 ` + token);

  // if (!token) {
  //   console.log("토큰이 없습니다.");
  //   return res.redirect('/login');
  // };

  // 인증 완료
  try {
    const token = req.headers.authorization.split(' ')[1];
    // req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    // 인증 실패
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
      error,
    });
  }
};
