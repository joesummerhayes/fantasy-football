import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app-state';

const MyTeam: React.FC = (): ReactElement => {
  const { user } = useSelector((state: AppState) => state);

  return (
    <div>
      My Team Page
    </div>
  );
};

export default MyTeam;
