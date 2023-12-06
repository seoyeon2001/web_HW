var express = require("express");
const mysql = require("../mysql/index.js");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
var router = express.Router();
router.use(express.json());

/* 회원가입 화면 */
router.get('/', (req, res) => {
  res.render('join');
});

/* 아이디 중복 체크 */
router.post("/check-userid", async (req, res) => {
  try {
    const id = req.body.id; // 사용자가 입력한 id

    const findId = await mysql.query("userID", id);

    if (findId.length !== 0) {
      // 사용중인 아이디
      res.json({ available: false, message: '이미 사용 중인 아이디입니다.' });
    } else {
      // 사용 가능한 아이디
      res.json({ available: true, message: '사용 가능한 아이디입니다.' });
    }
  } catch(err) {
    res.status(500).json({ error: '서버 오류' });
  }
});

/* 회원가입 */
router.post("/signup", async (req, res) => {
  const user = { // 사용자가 입력한 id, password
    id: req.body.id,
    password: req.body.password,
  };

  crypto.randomBytes(64, async (err, buf) => {
    const salt = buf.toString('base64');

    const user = {
      id: req.body.id,
      password: req.body.password,
      salt: salt,
    };

    crypto.pbkdf2(user.password, salt, 100000, 64, 'sha512', async (err, key) => {
      user.password = key.toString('base64');

      const result = await mysql.query("userInsert", user);

      res.json({ success: true });
    });
  });
});

module.exports = router;