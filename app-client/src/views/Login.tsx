import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import login from '../data/login';

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
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const classes = useStyles();

  const testing = (e: any) => {
    e.preventDefault();
    login(form);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    const { id } = target;

    const updatedForm = {
      ...form,
      [id]: value,
    };

    setForm(updatedForm);
  };

  console.log(form);

  return (
    <Box display="flex">
      <form className={classes.root} onSubmit={testing}>
        <div>
          Login
        </div>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            value={form.email}
            placeholder="email"
            onChange={handleInputChange}
            id="email"
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            value={form.password}
            placeholder="password"
            onChange={handleInputChange}
            id="password"
            type="password"
          />
        </div>
        <button type="submit">hello</button>
      </form>
    </Box>
  );
};

export default Login;
