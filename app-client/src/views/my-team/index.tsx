import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { AppState } from '../../app-state';
import ClubInfo from './club-info';
import LineUpField from './line-up-field';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5vw',
  },
}));

const MyTeam: React.FC = (): ReactElement => {
  const classes = useStyles();
  const { user } = useSelector((state: AppState) => state);

  return (
    <Box border={1} className={classes.root}>
      <ClubInfo />
      <LineUpField />
    </Box>
  );
};

export default MyTeam;
