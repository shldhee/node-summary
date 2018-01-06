## 테스트 주도 개발이란(TDD)?

* TDD로 개발하자!
* mocha, shuold, supderTest(라이브러리)
* 개발할때 바로 소스코드 작성하지 않고 테스트 코드를 만든 후 하나하나 만들어 나간다.
* 개발 시간이 많이 걸리지만 만들었던 프로젝트가 유지보수 시점에 갔을때 엄청난 효과를 느낄 수 있다.

#### mocha

* https://mochajs.org
* 모카(mocha)는 테스트 코드를 돌려주는 테스트 러너
* 테스트 수트: 테스트 환경으로 모카에서는 describe()으로 구현한다
* 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현한다
* `capitialize()`를 함수를 테스트 한다.
* `npm install mocha --save-dev`

_utils.js_

``` js
function capitialize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { // 모듈 내보내기
  capitialize: capitialize
};
```

_utils.spec.js_

``` js
// spec은 다 테스트 코드 명세의 줄임말

const utils = require('./utils'); // utils.js js생략 가능
const assert = require('assert'); // 실제 이 값이 맞다 안맞다 검증 모듈

describe('utils.js모듈의 capitialize() 함수는 ',()=>{
  it('문자열의 첫번째 문자를 대문자로 반환한다.', ()=> {
    // ... test code
    const result = utils.capitialize('hello');
    assert.equal(result, 'Hello'); // a, b
  })
})
```

* `.\node_modules\.bin\mocha utils.spec.js` 모카 실행

#### should

* "노드 assert말고 서드파티 라이브러리를 사용하라" (노드 공식 문서 테스트코드에서!!)
* https://shouldjs.github.io
* https://github.com/tj/should.js/
* 슈드(should)는 검증(aseertion) 라이브러리다.
* 가독성 상승!
* `npm i should --save-dev`

``` js
// spec은 다 테스트 코드 명세의 줄임말

const utils = require('./utils'); // utils.js js생략 가능
const should = require('should'); // 실제 이 값이 맞다 안맞다 검증 모듈

describe('utils.js모듈의 capitialize() 함수는 ',()=>{
  it('문자열의 첫번째 문자를 대문자로 반환한다.', ()=> {
    // ... test code
    const result = utils.capitialize('hello');
    result.should.be.equal('Hello'); // 가독성 상승!
  })
})
```

#### SuperTest

> 위에 까지는 단위 테스트(함수의 기능)

* 단위 테스트: 함수의 기능 테스트
* 통합 테스트: API의 기능 테스트(SuperTest) - 우리가 만드는 Api 최종 결과물 단위테스트보다 규모가 조금 크다.
* 슈퍼 테스트는 익스프레스 통합 테스트용 라이브러리다
* 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸뒤 결과를 검증한다

``` js
const request = require('supertest');
const express = require('express');

const app = express(); // app 객체

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' }); // json 응답
});

request(app) // request는 supertest의 모듈 내부적으로 서버 구동
  .get('/user') // 요청시나리오 리퀘스트 날린다.
  .expect('Content-Type', /json/) // 맞는지
  .expect('Content-Length', '15') // 맞는지
  .expect(200) // 맞는지
  .end(function(err, res) { // 에러를 받으면 에러 던진다.
    if (err) throw err;
  });
```

_index.js_

``` js
var express = require('express');
var app = express();
var morgan = require('morgan');
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

app.get('/users', function (req, res) {
  res.json(users);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // 변수 할당 가능
```

_index.spec.js_

``` js
const app = require('./index');
const request = require('supertest');

describe('GET /users', () => {
    it('...', (done) => { // API 서버 비동기 동작, 비동기처리, done콜백함수
      request(app)
        .get('/users')
        .end((err, res) => {
          console.log(res.body); // users data 배열
          done(); // done 콜백함수 호출
        })
    })
})
```

## TDD 로 하는 API 서버 개발

#### 첫 API 테스트 만들기

* 성공
  - 유저 객체를 담은 배열로 응답한다
  - 최대 limit 갯수만큼 응답한다
* 실패
  - limit이 숫자형이 아니면 400을 응답한다
  - offset이 숫자형이 아니면 400을 응답한다

#### npm 테스트 스크립트

``` js
{
  "name": "node-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "express": "^4.16.2",
    "morgan": "^1.9.0"
  },
  "devDependencies": {
    "mocha": "^4.1.0",
    "should": "^13.2.0",
    "supertest": "^3.0.0"
  },
  "scripts": {
    "test": "mocha index.spec.js", // 모든 경로 써줄 필요가 없다. node_modules/.bin/mocha index.spec.js 처럼...
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

`npm t`

_index.spec.js_

``` js
const should = require('should');
const app = require('./index');
const request = require('supertest');

describe('GET /users', () => {
  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답한다.', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // done 콜백함수 호출
        })
    })

    it('최대 limit 갯수만큼 응답한다. ', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done(); // done 콜백함수 호출
        })
    })
  })

  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
      request(app)
        .get('/users?limit=two') // 알파벳으로 적는다.
        .expect(400)
        //.end((err, res) => {
          // res.body 대신 expect(400)으로 대체
          //done();
        .end(done); // done() 함수만 넣을꺼니 간단하게 작성
        })
    })
  })
```

_index.js_

``` js
var express = require('express');
var app = express();
var morgan = require('morgan');
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

app.get('/users', function (req, res) {
  req.query.limit = req.query.limit || 10; // limit이 있으면 앞에꺼 없으면 10을 할당
  // const limit = req.query.limit; 문자열 "2" 정수형으로 변경
  const limit = parseInt(req.query.limit, 10); // 정수형으로 변경 2번째 파라미터는 10진수 표기
  if (Number.isNaN(limit)) { // limit이 정수가 아니면 NaN을 반환 따라서 limit이 NaN이면 정수가 아닐 경우
    return res.status(400).end(); // res.status(200)으로 기본 설정
  }
  res.json(users.slice(0,limit));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // 변수 할당 가능
```
