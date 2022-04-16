const mongoose = require('mongoose');


let repoSchema = mongoose.Schema({
  user_name: String,
  repo_id: { type: Number, required: true },
  repo_name: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repos) => {
  try {
    for (let repo of repos) {
      let data = {};
      data.user_name = repo.owner.login;
      data.repo_id = repo.id;
      data.repo_name = repo.name;
      data.url = repo.html_url;
      data.forks = repo.forks_count;

      let newRepo = await Repo.create(data);
    }
    console.log('new repo saved!');
  } catch (err) {
    console.error(err.message);
  }
}

module.exports.save = save;
