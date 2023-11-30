// 이건 안쓰는거야 바보야



const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { verifyToken } = require("./middlewares");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const id = req.body.id;

    const token = jwt.sign(
      { id, },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
        issuer: "토큰 발급자",
      }
    );

    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
