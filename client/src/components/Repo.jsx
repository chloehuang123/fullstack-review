import React from 'react';

const Repo = ({url, name, forks}) => {
  console.log('Name got here', name);
  return (
    <div>
      <h4>{name}</h4>
      <p>{forks}</p>
      <a href="{url}" alt="">link</a>
    </div>
  )
}

export default Repo;