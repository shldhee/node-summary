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
