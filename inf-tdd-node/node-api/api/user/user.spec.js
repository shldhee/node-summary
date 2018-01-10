const should = require('should');
const app = require('../../');
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
        .get('/users?limit=2') // userlist 2개만 받겠다.
        .end((err, res) => {
          res.body.should.have.lengthOf(2) // 길이가 2이어야 한다.
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

describe('GET /users/:id는 ', () => {
  describe('성공시', () => {
    it('id가 1인 유저 객체를 반환한다.', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답한다.', (done) => {
      request(app)
        .get('/users/asdf')
        .expect(400)
        .end(done);
    });
    it('id로 유저로 찾을 수 없는 경우 404로 응답한다.', (done) => {
      request(app)
        .get('/users/4')
        .expect(404)
        .end(done);
    });
  })
});

describe('DELETE /users/:id', () => {
  describe('성공시', () => {
    it('204를 응답한다', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done);
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답한다.', (done) => {
      request(app)
        .delete('/users/asdf')
        .expect(400)
        .end(done);
    })
  })
});

describe('POST /users', () => {
  describe('성공시', () => {
    let name = 'daniel', body;
    before(done=> {
      request(app)
        .post('/users')
        .send({name})
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    }) // 아래 테스트함수가 동작하기전에 미리 실행하는 함수
    it('생성된 유저 객체를 반환한다.', () => {
      body.should.have.property('id');
    })
    it('입력한 name을 반환한다', () => {
      body.should.have.property('name', name);
    })
  });

  describe('실패시', () => {
    it('name 파라메티 누락시 400을 반환한다.', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done);
    })

    it('name이 중복일 경우 409를 반환한다.', (done) => {
      request(app)
        .post('/users')
        .send({name: 'daniel'})
        .expect(409)
        .end(done)
    })
  })
})

describe('PUT /users/:id', () => {
  describe('성공시', () => {
    it('변경된 name을 응답한다.' , (done) => {
      const name = "call";
      request(app)
        .put('/users/3')
        .send({name})
        .end((err, res) => {
          res.body.should.have.property('name', name)
          done();
        })
    })
  })

  describe('실패시', () => {
    it('정수가 아닌 id일 경우 400 응답', (done) => {
      request(app)
        .put('/users/one')
        .expect(400)
        .end(done);
    })
    it('name이 없을 경우 400 응답', (done) => {
      request(app)
        .put('/users/1')
        .send({}) // body 보내기
        .expect(400)
        .end(done);
    })
    it('없는 유져일 경우 404 응답', (done) => {
      request(app)
        .put('/users/999')
        .send({name: 'foo'})
        .expect(404)
        .end(done);
    })
    it('이름이 중복일 경우 409 응답', (done) => {
      request(app)
        .put('/users/3')
        .send({name: 'John'})
        .expect(409)
        .end(done);
    })
  })
})
