import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    width: '50%',
  },
  inputField: {
    paddingTop: '1rem',
  },
  submitButton: {
    marginTop: '1rem',
  },
});

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <form className={classes.root}>
        <div>
          Login
        </div>
        <div className={classes.inputField}>
          <TextField fullWidth variant="outlined">Hello</TextField>
        </div>
        <div className={classes.inputField}>
          <TextField fullWidth variant="outlined">Hello</TextField>
        </div>
      </form>
    </Box>
  );
};

export default Login;
