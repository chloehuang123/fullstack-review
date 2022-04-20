import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo) => {
      return <Repo key={repo._id} repo={repo} />;
    })}
  </div>
);

export default RepoList;
