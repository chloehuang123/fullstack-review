const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/fetcher', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.error(err.message));

const express = require('express');
const db = require('../database/index');
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
  getReposByUsername(req.body.username)
    .then((data) => {
      db.save(data);
    })
    .then((result) => {
      res.send(result);
      res.end();
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get request here')
  db.read( ).then(
    (data) => res.send(data),
    (err) => console.log('Error get repos')
  );
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
