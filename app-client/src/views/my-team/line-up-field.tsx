import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Center from '../components/Center';
import { AppState } from '../../app-state';
import LinkButton from '../components/LinkButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '70vh',
  },
  button: {
    margin: '1rem',
  },
}));

const LineUpField: React.FC = (): JSX.Element => {
  const league = useSelector((state: AppState) => state?.user?.userDetails?.draftLeague?.league);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Center>
        {!league && <LinkButton text="Join League" to="/join-league" bigButtonDark className={classes.button} />}
        {!league && <LinkButton text="Create League" to="/create-league" bigButtonDark className={classes.button} />}
      </Center>
    </Box>
  );
};

export default LineUpField;
