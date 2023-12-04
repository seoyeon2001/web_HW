var express = require("express");
var router = express.Router();
const { verifyToken } = require("./middlewares");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/checktoken", verifyToken, (req, res, next) => {
  res.json(req.decoded)
});

router.get("/hello", function (req, res, next) {
  res.render("hello");
});

module.exports = router;