const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 가상의 데이터베이스
const users = [];

// 회원가입 라우트
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  // 예: 아이디 중복 체크
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
  }

  // 사용자 정보 저장
  const newUser = { username, password, email };
  users.push(newUser);

  return res.json({ message: '회원가입이 완료되었습니다.' });
});

// 로그인 라우트
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자 검증
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
  }

  return res.json({ message: '로그인 성공!' });
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
