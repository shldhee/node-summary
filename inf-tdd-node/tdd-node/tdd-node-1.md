## Node JS

#### 이벤트 기반의 비동기 I/O 프레임워크

* EventLoop Job을 처리 후 Client에게 반환
* 싱글쓰레드 이벤트 기반

**비동기 I/O**
* 이벤트가 바로 실행되어 응답 가능한데
* 많은 시간이 필요한 이벤트가 있을 수가 있다.(디스크 파일 읽기, 외부 네이트워크 통신 등) 매우매우 큰 Job
* 다른 쓰레드에게 위임한다(Non-Blocking Worker)
* 이벤트 루프에게 받은것들을 실행하고 완료되면 결과를 이벤트 형태로 이벤트 큐에다가 전달한다.
* 이벤트 루프는 돌다가 이벤트 큐에 있는것들을 차곡차곡 실행하다. 워커 쓰레드가 보내준 이벤트 큐를 실행한다.
* 모두 완료되면 클라이언트에게 결과를 전달한다.

#### 모듈 시스템

* CommonJS : 모듈 하나하나를 파일로 만들어 관리, 브라우저에서는 파일로 관리할 수가 없었다.
``` js
const http = require('http'); // 모듈 사용

http.createServer(); // 모듈 불러서 메소드 사용 가능
```

_math.js_

``` js
function sum(a, b) { // 함수 정의
  return a + b;
}

module.exports = { // 객체로 반환
  sum: sum
};
```

_index.js_

``` js
const math = require('./math.js'); // 모듈 파일 호출

const result = math.sum(1, 2);

console.log(result); // 3
```

#### 비동기 세계

* ReadFileSync : 동기
_index.js_
``` js
const fs = require('fs');

const data = fs.readFileSync('./data.txt', 'utf8');

console.log(data);  // This is data file.

```

_data.txt_

``` txt
This is data file.
```

* ReadFile : 비동기 ( 콜백 사용 )

``` js
const fs = require('fs');

const data = fs.readFile('./data.txt','utf8', function(err, data) {
  console.log(data);
})

console.log(123);

// 123출력후 This is data file 출력
```

#### Hello world 노드버전

_index.js_

``` js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

* http 요청을 보낼 수 있는 커맨드라인 명령어
* window 에서는 따로 설치해야되는듯(우선 `localhost:3000` 에서 확인해보자)

`curl -X GET 'localhost:3000'`

#### 라우팅

``` js
const http = require('http'); // http 모듈 가져오기

const hostname = '127.0.0.1'; // 내 컴퓨터 주소
const port = 3000; // 3000 포트 사용

const server = http.createServer((req, res) => { // 콜백함수, 클라이언트가 접속했을때 동작한다.

  // console.log(req.url); // 클라이언트가 요청정보(url)가 들어가있따.

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  } else if (req.url === '/users') {
    res.statusCode = 200;
    res.setHeader('Content-typ', 'text/plain');
    res.end('User List');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }


});

server.listen(port, hostname, () => { // 서버를 요청 대기 상태, 서버가 클라이언트의 요청을 받기 위해 종료하지 않고 대기하는 상태, 파라미터 3개 받는다.
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

* 분기문이 너무 많아져 비효율적이다.
* 따라서, `ExpressJs`를 사용한다.

#### 익스프레스JS 기초

[http://expressjs.com/ko/](http://expressjs.com/ko/)

* 어플리케이션
* 미들웨어
* 라우팅
* 요청객체
* 응답객체

#### ExpressJs - 어플리케이션

* 익스프레스 인스턴스를 어플리케이션이라 한다
* 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다
* 라우팅 설정을 할 수 있다
* 서버를 요청 대기 상태로 만들수 있다

``` js
const express = require('express');
const app = express();
app.listen(3000, function() {
  console.log('Sever is running');
})
```

#### ExpressJs - 미들웨어

* Express에 기능 추가시 미들웨어로 추가한다.
* `req`, `res`, `next`총 3개의 매개변수를 받는다.
* `next()`함수를 써줘야 다음 로직을 실행한다.
* 미들웨어는 함수들의 연속이다.
* 로깅미들웨어를 만들어 사용해보자.
* 미들웨어 추가시 `use()` 사용

_logger 미들웨어_

``` js
const express = require('express');
const app = express();

function logger(req, res, next) {
  console.log('I am logger');
  next();
}

app.use(logger);

app.listen(3000, function() {
  console.log('Sever is running');
})
```

_logger2 미들웨어 추가_

``` js
const express = require('express');
const app = express();

function logger(req, res, next) {
  console.log('I am logger');
  next(); //  이 부분 주석 처리 시 `I am logger`만 찍힌다. logger2가 실행이 안됨
}

function logger2(req, res, next) {
  console.log('I am logeer2');
  next();
}

app.use(logger);
app.use(logger2);

app.listen(3000, function() {
  console.log('Sever is running');
})
```

_써드 파티 미들웨어 morgan 추가_

``` js
const express = require('express');
const morgan = require('morgan'); // morgan 미들웨어 추가
const app = express();

function logger(req, res, next) {
  console.log('I am logger');
  next();
}

function logger2(req, res, next) {
  console.log('I am logeer2');
  next();
}

app.use(logger);
app.use(logger2);
app.use(morgan('dev')); // app.user를 통해 morgan 미들웨어 추가 `dev`는 옵션

app.listen(3000, function() {
  console.log('Sever is running');
})
```

_에러 미들웨어_

``` js
const express = require('express');
const app = express();

function commonmw(req, res, next) {
  console.log('commonmw');
  next(new Error('error ouccered'));
}

function errormw(err, req, res, next) {
  console.log(err.message);
  // 에러를 처리하거나 처리를 못할 경우 next(err); 다음 객체로 넘긴다
  // 이 경우는 에러를 처리했으면 next(); 만 호출
  next();
}

app.use(commonmw);
app.use(errormw);

app.listen(3000, function() {
  console.log('Server is running');
})
```

#### ExpressJs - 라우팅

* 요청에 해당하는 응답을 연결해주는 것을 라우팅이라고 한다.
* 요청에 url에 대해 적절한 핸들러 함수로 연결해 주는 기능을 라우팅이라고 부른다.
* 어플리케이션의 `get()`,`post()`메소드로 구현할 수 있다.
* 라우팅을 위한 전용 `Router` 클래스를 사용할 수도 있다.

#### ExpressJs - 요청객체

* 클라이언트의 요청 정보를 담은 객체를 요청(Request)객체라고 한다.
* http 모듈의 request 객체를 래핑한 것이다.
* req.params(), req.query(), req.body() 메소드를 주로 사용한다

#### ExpressJs - 응답객체

* 클라이언트 응답 정보를 담은 객체를 응답(Response)객체라고 한다.
* http 모듈의 response 객체를 래핑한 것이다.
* res.send(), res.status(), res.json() 메소드를 주로 사용한다.

#### ExpressJs - Hello world

``` js
var express = require('express');
var app = express();

app.get('/', function (req, res) { // root('/')경로로 들어왔을시 처리, 콜백함수 req, res인자는 http req, res가 아니고 이걸 래핑한 express의 객체입니다.
  res.send('Hello World!'); // 문자열 출력 send()
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

#### REST API

#### HTTP 요청

* 모든 자원은 명사로 식별한다.
* HTTP 경로로 자원을 요청한다.
* 예
  - GET /users
  - Get /users/{id}

#### HTTP 메서드

* 서버 자원에 대한 행동을 나타낸다.(동사로 표현)
  - GET: 자원을 조회
  - POST: 자원을 생성
  - PUT: 자원을 갱신
  - DELETE: 자원을 삭제

* 이는 익스프레스 어플리케이션의 메소드로 구현되어 있다.

``` js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('users list')
});

app.post('/users', funciton(req, res) {
  // create users
  res.send(user)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```


#### HTTP 상태 코드

* 1xx : 아직 처리중
* 2xx : 자, 여기 있어!
  - 200: 성공(success), GET, PUT
  - 201: 작성됨(created), POST
  - 204: 내용 없음 (No Content), DELETE
* 3xx : 잘 가~
* 4xx : 니가 문제임
  - 400: 잘못된 요청(Bad Request)
  - 401: 권함 없음(Unauthorized)
  - 404: 찾을 수 없음(Not found)
  - 409: 충돌(Conflict)
* 5xx : 내가 문제임
  - 서버 에러(Interel Server error)

#### 첫 API 만들기

* GET /users
* 사용자 목록을 조회하는 기능

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

app.get('/', function (req, res) {
  res.json(users);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
