var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user/index.js'); //index.js 생략해도 무방하다.

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', user); // users에 요청되는 API이들은 user가 담당한다.

//post 데이터 줄때 body로 접근 express에서는 body를 지원하지 않는다. body-parser 사용 multer는 이미지 같은 큰거

module.exports = app; // 변수 할당 가능
