import React from 'react';

const Repo = ({ repo }) => {
  // console.log('Name got here', name);
  console.log('repo is here',repo);
  return (
    <li>
      {repo.repo_name}
      {repo.forks}
      <a href={repo.url} alt=''>
        link
      </a>
    </li>
  );
};

export default Repo;
