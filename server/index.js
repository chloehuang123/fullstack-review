const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/fetcher', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((err) => console.error(err));

const express = require('express');
const db = require('../database/index');
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// const connection = db.mongoose.connection;

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database.

  var name = req.body['username'];

  getReposByUsername(name).then((data) => {
    // console.log(data);
    db.save(data);
  });

  // getReposByUsername(name);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
