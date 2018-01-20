## 테스트 환경 개선

#### 서버 로그 개선

* NODE_ENV=test
* test는 process 객체로 들어온다.
* test환경에서는 미들웨어 작동 하지 않는다.

_index.js_

``` js
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
```

_package.json_

``` js
"scripts": {
  "test": "cross-env NODE_ENV=test mocha api/user/user.spec.js",
  "start": "node index.js"
},
```

`npm i cross-env --save-dev`


#### 서버 구동

_user.spec.js_

``` js
const request = require('supertest');
//...
request(app) // 서버 구동
```

_index.json_

``` js
app.listen(3000, function () { // 서버 구동 중복 삭제 가능
  console.log('Example app listening on port 3000!');
});
```

* index.js 에서 `app`모듈 user.spec.js에서 받아 사용

## npm start

* 서버 구동 안된다.
* 별도의 스크립트 파일(root/bin/www.js)

_www.js_

``` js
const app = require('../index');

app.listen(3000, () => {
  console.log('Server is runnig on 3000 port');
});
```

_package.json_

``` js
"scripts": {
  "test": "cross-env NODE_ENV=test mocha api/user/user.spec.js",
  "start": "node bin/www.js"
},
```
