var express = require("express");
const mysql = require("../mysql/index.js");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
var router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  console.log("/join경로에서 join.html 요청됨");
  res.render('join');
});

router.post("/check-userid", async (req, res) => {
    try {
      const id = req.body.id; // 사용자가 입력한 id

      console.log(`사용자가 입력한 아이디: ` + id);
      const findId = await mysql.query("userID", id);
      console.log(findId);

      if (findId.length !== 0) {
        // 사용중인 아이디
        console.log('이미 사용 중인 아이디입니다.');
        res.json({ available: false, message: '이미 사용 중인 아이디입니다.' });
        // res.send(`<script type="text/javascript">alert("이미 사용 중인 아이디입니다."); document.location.href="/join";</script>`);
      } else {
        // 사용 가능한 아이디
        console.log('사용 가능한 아이디입니다.');
        res.json({ available: true, message: '사용 가능한 아이디입니다.' });
      }
    } catch(err) {
      // console.log(err);  
      res.status(500).json({ error: '서버 오류' });
    }
  });


router.post("/signup", async (req, res) => {
    console.log('join post 요청됨');

    const user = { // 사용자가 입력한 id, password
      id: req.body.id,
      password: req.body.password,
    };

    console.log(user);

    crypto.randomBytes(64, async (err, buf) => {
      const salt = buf.toString('base64');

      const user = {
        id: req.body.id,
        password: req.body.password,
        salt: salt,
      };
  
      console.log(user);

      crypto.pbkdf2(user.password, salt, 100000, 64, 'sha512', async (err, key) => {
        user.password = key.toString('base64');

        const result = await mysql.query("userInsert", user);
        console.log(result);

        res.json({ success: true });
      });
    });

      // res.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다."); document.location.href="/login";</script>`);

  });

module.exports = router;