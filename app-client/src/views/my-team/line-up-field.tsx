import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LeagueButton from './league-button';
import Center from '../components/Center';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '70vh',
  },
}));

const LineUpField: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Center>
        <LeagueButton />
      </Center>
    </Box>
  );
};

export default LineUpField;
