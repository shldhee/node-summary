const models = require('../../models')

const index = function (req, res) {
  req.query.limit = req.query.limit || 10;
  // const limit = req.query.limit; 문자열 "2" 정수형으로 변경
  const limit = parseInt(req.query.limit, 10); // 정수형으로 변경 2번째 파라미터는 10진수 표기
  if (Number.isNaN(limit)) { // limit이 정수가 아니면 NaN을 반환 따라서 limit이 NaN이면 정수가 아닐 경우
    return res.status(400).end(); // res.status(200)으로 기본 설정
  }

  models.User
    .findAll({
        limit: limit
    })
    .then(users => {
      res.json(users)
    });

}

const show = function (req, res) {
  const id = parseInt(req.params.id, 10); // 문자열 반환하기 때문
  if(Number.isNaN(id)) return res.status(400).end();

  models.User.findOne({
    where: {id}
  }).then(user => {
      if (!user) return res.status(404).end();
      res.json(user);
  })
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  models.User.destroy({
    where: {id}
  }).then(() => {
    res.status(204).end();
  });

}

const create = (req, res) => {
  const name = req.body.name; // send name 가져옴
  if (!name) return res.status(400).end();



  models.User.create({name})
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
      if( err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).end();
      }
      res.status(500).end();
    })
}

const update =  (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if(!name) return res.status(400).end();


  //if(isConflict) return res.status(409).end();

  // const userName = users.filter(user => user.name === name);
  // if(userName) return res.status(409).end();

  models.User.findOne({where: {id}})
       .then(user => {
         if (!user) return res.status(404).end();

         user.name = name;
         user.save()
             .then(_ => {
               res.json(user);
             })
             .catch(err => {
               if (err.name === 'SequelizeUniqueConstraintError')  {
                 return res.status(409).end();
               }
               res.status(500).end();
             })
       })
}

module.exports = { index, show, destroy, create, update };
