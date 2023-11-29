var express = require("express");
var router = express.Router();
const { verifyToken } = require("./middlewares");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("root 요청됨");
  res.render("index");
});

router.get("/checktoken", verifyToken, (req, res, next) => {
  console.log("checktoken 요청됨");
  res.json({ code: 200, message: "토큰이 유효합니다." });
});

router.get("/hello", function (req, res, next) {
  console.log("/hello에서 hello.html이 화면에 보여짐.");
  res.render("hello");
});

module.exports = router;


// const token = req.headers.authorization;
// if (!token) {
//   console.log("토큰이 없습니다.");
//   return res.redirect("/login");
// } else {
//   console.log("토큰이 있습니다.");
//   res.render("index");
// }
