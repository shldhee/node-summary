## 데이터베이스

  * 서버에서 데이터를 저장

#### SQL

  * 테이블 형식(column, row), 엑셀, Sqlite(파일형태) - 간단한 데이터베이스
  * MySQL, PostgreSQL, Aurora, Sqlite

#### NOSQL

  * 도큐멘트 형식(테이블 X), JSON형식, 형식 쉽게 변경
  * MongoDB, DynamoDB

#### In Memory DB

  * user배열 메모리 저장, 메모리안에 데이터 베이스 만듬, 재구동 시 없어짐, 퍼포먼스 좋다, 인증 등에 사용
  * Redis, Memcahsed

#### SQL 쿼리 기초

  * `insert users ('name') values ('alice');` users의 name의 alice 값 삽입
  * `select * from users;` users 조회
  * `update users set name = 'bek' where id = 1;` users의 id값이 1인 name을 'bek' 업데이트
  * `delete from users where id = 1;`users의 아이디 값이 1 지움

#### ORM

  * 데이터베이스를 객체로 추상화해 논것을 ORM(Object Relational Mapping)이라고 한다.
  * 쿼리를 직접 작성하는 대신 ORM의 메소드로 데이터 관리할 수 있는 것이 장점이다.
  * 노드에서 SQL ORM은 시퀄라이져(Sequelize)가 있다.

#### ORM 사용시

* `insert users ('name') values ('alice');` users의 name의 alice 값 삽입
  - `User.create({name:'alice'});`
* `select * from users;` users 조회
  - `User.findAll();`
* `update users set name = 'bek' where id = 1;` users의 id값이 1인 name을 'bek' 업데이트
  - `User.update({name:'bek'}, {where: {id: 1}});`
* `delete from users where id = 1;`users의 아이디 값이 1 지움
  - `User.destroy({where: {id: 1}});`

#### 모델

* 데이터베이스 테이블을 ORM으로 추상화한것을 모델이라고 한다.
* 우리가 사용할 유저 모델을 만들어 보자
  - `sequelize.define()`: 모델 정의
  - `sequelize.sync()` : 데이터베이스 연동
