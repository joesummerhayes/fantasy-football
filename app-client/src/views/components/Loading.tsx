import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Center from '../components/Center';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Loading: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Center>
      <div className={classes.root}>
        <CircularProgress size="5rem" />
      </div>
    </Center>
  );
};

export default Loading;
