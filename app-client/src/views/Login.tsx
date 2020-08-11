import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Box, Typography } from '@material-ui/core';
import Arrow from '@material-ui/icons/ArrowForward';
import MuiAlert from '@material-ui/lab/Alert';
import { loginAction } from '../actions/index';
import { required, email } from '../utils/validation';
import hero from '../images/loginHero.png';
import Button from './components/Button';
import { AppState } from '../app-state';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    width: '40%',
  },
  inputField: {
    paddingTop: '1rem',
  },
  submitButton: {
    margin: '1rem 0 1rem 0',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 'inherit',
  },
  box: {
    backgroundImage: `url(${hero})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
  },
  inputText: {
    color: 'black',
  },
  textField: {
    backgroundColor: 'rgba(343, 342, 324, 0.5)',
  },
  helperActions: {
    paddingBottom: '1rem',
    letterSpacing: '0.1px',
  },
  arrowIcon: {
    height: '0.7em',
  },
  header: {
    fontSize: '1.5rem',
    letterSpacing: '0.1px',
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
  const isError = useSelector((state: AppState) => state.error);

  const loginUser = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
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
    if (isError?.errorLocation === 'login') {
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
    <Box display="flex" className={classes.box}>
      <form className={classes.root}>
        <Typography className={classes.header}>
          Sign In
        </Typography>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            value={form.email.value}
            label="Email"
            InputLabelProps={{ className: classes.inputText }}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('email')}
            id="email"
            helperText={form.email.touched && !form.email.valid ? 'Must provide an email' : ''}
            error={form.email.touched && !form.email.valid}
            className={classes.textField}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            fullWidth
            variant="outlined"
            value={form.password.value}
            label="Password"
            InputLabelProps={{ className: classes.inputText }}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('password')}
            id="password"
            type="password"
            helperText={form.password.touched && !form.password.valid ? 'Enter your password' : ''}
            error={form.password.touched && !form.password.valid}
            className={classes.textField}
          />
        </div>
        {handleError()}
        <Button text="Login" clickHandler={loginUser} className={classes.submitButton} />
        <Typography className={classes.helperActions}>
          Forgot your password?
          <Arrow className={classes.arrowIcon} />
        </Typography>
        <Typography className={classes.helperActions}>
          Sign up?
          <Arrow className={classes.arrowIcon} />
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
