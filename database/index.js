const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/fetcher', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.error(err.message));

let repoSchema = new mongoose.Schema({
  user_name: String,
  repo_id: { type: Number, required: true },
  repo_name: String,
  url: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (userRepos) => {
  // console.log('userRepos', userRepos);
  let resolveMe = userRepos.map((userRepo) => {
    let filter = { repo_id: userRepo.id };
    let update = {
      repo_name: userRepo.name,
      user_name: userRepo.owner.login,
      url: userRepo.owner.html_url,
      forks: userRepo.forks_count,
    };
    let options = {
      new: true,
      upsert: true,
      useFindAndModify: false,
    };

    Repo.findOneAndUpdate(filter, update, options, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Success saving repo');
    });
  });
  return Promise.all(resolveMe);
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
