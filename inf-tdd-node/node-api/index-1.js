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
