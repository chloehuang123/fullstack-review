import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo) => {
      return (
        <Repo
          key={repo.repo_id}
          url={repo.url}
          name={repo.repo_name}
          forks={repo.forks}
        />
      );
    })}
  </div>
);

export default RepoList;
