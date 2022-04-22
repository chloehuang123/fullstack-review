const mongoose = require('mongoose');

const express = require('express');
const db = require('../database/index.js');
console.log(db);
const { getReposByUsername } = require('../helpers/github.js');
let app = express();

app.use(express.urlencoded({ extended: false }));

// const connection = db.mongoose.connection;

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database.
  console.log('app post 1', req.body.term);
  return getReposByUsername(req.body.term)
    .then((data) => {
      console.log('received data 3', data);
      // for (let i = 0; i < data.length; i++) {
      //   db.save(data[i]);
      // }
      // {data: [ ]}
      db.save(data);
    })
    .then((result) => {
      console.log('result 5', result);
      res.send(result);
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.read().then(
    (data) => res.send(data),
    (err) => console.log('Error get repos')
  );
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
