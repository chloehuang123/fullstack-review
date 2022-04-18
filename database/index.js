const mongoose = require('mongoose');

let repoSchema = mongoose.Schema({
  user_name: String,
  repo_id: { type: Number, required: true },
  repo_name: String,
  url: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repos) => {
  try {
    for (let i = 0; i < repos.length; i++) {
      let repo = new Repo({
        user_name: repos[i].owner.login,
        repo_id: repos[i].id,
        repo_name: repos[i].name,
        url: repos[i].owner.html_url,
        forks: repos[i].forks_count,
      });
       await repo.save();
    }

  } catch (err) {
    console.error(err.message);
  }
};

let read = async () => {
  try {
    return await Repo.find({}).sort({ forks: -1 }).limit(25);
  } catch (err) {
    console.log('Error read repo');
  }
};

module.exports.save = save;
module.exports.read = read;
