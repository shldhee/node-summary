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
