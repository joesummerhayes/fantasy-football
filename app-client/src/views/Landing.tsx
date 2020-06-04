import React from 'react';
import getUser from '../data/get-user';

const Landing = () => {
  return (
    <div>
      Landing Page
      <button onClick={() => getUser()}>Get User details</button>
    </div>
  );
};

export default Landing;

