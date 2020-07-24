import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LeagueButton from './league-button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '70vh',
  },
  leagueButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

const LineUpField: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div className={classes.leagueButton}>
        <LeagueButton />
      </div>
    </Box>
  );
};

export default LineUpField;
