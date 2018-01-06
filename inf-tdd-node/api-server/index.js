var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'John'
  },
  {
    id: 3,
    name: 'Beck'
  },
];

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/users', function (req, res) {
  req.query.limit = req.query.limit || 10;
  // const limit = req.query.limit; 문자열 "2" 정수형으로 변경
  const limit = parseInt(req.query.limit, 10); // 정수형으로 변경 2번째 파라미터는 10진수 표기
  if (Number.isNaN(limit)) { // limit이 정수가 아니면 NaN을 반환 따라서 limit이 NaN이면 정수가 아닐 경우
    return res.status(400).end(); // res.status(200)으로 기본 설정
  }
  res.json(users.slice(0,limit));
});

app.get('/users/:id', function (req, res) {
  const id = parseInt(req.params.id, 10); // 문자열 반환하기 때문
  if(Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();
  users = users.filter(user => user.id !== id);
  res.status(204).end();
})

app.post('/users', (req, res) => {
  const name = req.body.name; // send name 가져옴
  if (!name) return res.status(400).end();
  const isConflict = users.filter(user => user.name === name).length;
  if(isConflict) return res.status(409).end();
  const id = Date.now();
  const user = {id, name}; // 객체
  users.push(user);
  res.status(201).json(user);
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if(!name) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length;
  if(isConflict) return res.status(409).end();

  // const userName = users.filter(user => user.name === name);
  // if(userName) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if(!user) return res.status(404).end();

  user.name = name;

  res.json(user);
});

//post 데이터 줄때 body로 접근 express에서는 body를 지원하지 않는다. body-parser 사용 multer는 이미지 같은 큰거

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // 변수 할당 가능
