import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app-state';

const MyTeam: React.FC = (): ReactElement => {
  const { user } = useSelector((state: AppState) => state);
  console.log(user);

  return (
    <div>
      My Team Page
    </div>
  );
};

export default MyTeam;
