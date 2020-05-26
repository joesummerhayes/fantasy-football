import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    width: '50%',
  },
  inputField: {
    paddingTop: '1rem',
  },
});

const Signup = (): ReactElement => {
  const classes = useStyles();

  const [form, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...form,
      email: event.target.value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...form,
      password: event.target.value,
    });
  };

  const handleConfirmPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...form,
      confirmPass: event.target.value,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...form,
      name: event.target.value,
    });
  };

  const submitSignup = () => {
    console.log(form);
  }

  return (
    <Box display="flex">
      <form className={classes.root}>
        <div className={classes.inputField}>
          <TextField id="email" variant="outlined" placeholder="name" value={form.name} onChange={handleNameChange} required fullWidth />
        </div>
        <div className={classes.inputField}>
          <TextField id="email" variant="outlined" placeholder="email address" value={form.email} onChange={handleEmailChange} required fullWidth />
        </div>
        <div className={classes.inputField}>
          <TextField id="password" variant="outlined" placeholder="password" value={form.password} onChange={handlePasswordChange} required fullWidth />
        </div>
        <div className={classes.inputField}>
          <TextField id="confirm-password" variant="outlined" placeholder="confirm password" value={form.confirmPass} onChange={handleConfirmPassChange} required fullWidth />
        </div>
        <Button variant="contained" onClick={submitSignup}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
