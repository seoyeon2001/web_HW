var express = require("express");
var router = express.Router();
const { verifyToken } = require("./middlewares");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* 토큰 체크 */
router.get("/checktoken", verifyToken, (req, res, next) => {
  res.json(req.decoded)
});

module.exports = router;

