const mongoose = require('mongoose');


let repoSchema = mongoose.Schema({
  repo_name: { type: String, required: true },
  user_name: String,
  url: { type: String, required: true },
  forks_and_watchers: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  let newRow = new Repo({
    repo_name: repo.name,
    user_name: repo.user_name,
    url: repo.url,
    forks_and_watchers: repo.forks_and_watchers,
  });
  newRow
    .save()
    .then(() => console.log(newRow))
    .catch((err) => console.error(err.message));
};

module.exports.save = save;
