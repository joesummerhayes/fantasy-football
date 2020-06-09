import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { loginAction } from '../actions/index';
import { required, email } from '../utils/validation';


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

  const [form, setForm] = React.useState<Record<string, FFType.FormItem>>({
    email: {
      touched: false,
      valid: false,
      value: '',
      validators: [required, email],
    },
    password: {
      touched: false,
      valid: false,
      value: '',
      validators: [required],
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const isError = useSelector((state: any) => state.error);

  const loginUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(form);
    const formValues = {
      email: form.email.value,
      password: form.password.value,
    };
    dispatch(loginAction(formValues));
  };

  const blurHandler = (inputField: string): void => {
    setForm({
      ...form,
      [inputField]: {
        ...form[inputField],
        touched: true,
      },
    });
  };

  const handleError = (): ReactElement | void => {
    if (isError.errorLocation === 'login') {
      return <MuiAlert severity="error">{isError.specificError}</MuiAlert>;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    const { id } = target;
    let isInputValid = true;
    form[id].validators.map((validator: FFType.Validator): void => {
      isInputValid = isInputValid && validator(value);
    });

    const updatedForm = {
      ...form,
      [id]: {
        ...form[id],
        valid: isInputValid,
        value,
      },
    };

    setForm(updatedForm);
  };

  return (
    <Box display="flex">
      <form className={classes.root} onSubmit={loginUser}>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            value={form.email.value}
            placeholder="email"
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('email')}
            id="email"
            helperText={form.email.touched && !form.email.valid ? 'Must provide an email' : ''}
            error={form.email.touched && !form.email.valid}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            value={form.password.value}
            placeholder="password"
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('password')}
            id="password"
            type="password"
            helperText={form.password.touched && !form.password.valid ? 'Enter your password' : ''}
            error={form.password.touched && !form.password.valid}
          />
        </div>
        {handleError()}
        <Button
          variant="contained"
          className={classes.submitButton}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;
