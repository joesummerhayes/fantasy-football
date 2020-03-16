import React from 'react';
import getPremTeam from '../data/prem-team';

const Landing: React.FC = () => {
  const foo = getPremTeam('5e6c0c6902654f24f473cd74');
  console.log(foo);
  return (
    <div>
      This it the landing page
    </div>
  );
};

export default Landing;
