import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import { loginAction } from '../actions/index';

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
  const dispatch = useDispatch();

  const loginUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loginAction(form));
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

  return (
    <Box display="flex">
      <form className={classes.root} onSubmit={loginUser}>
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
