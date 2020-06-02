import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { required, length, email } from '../utils/validation';
import { createUserAction, redirect } from '../actions/index';

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


const Signup = (props: any): ReactElement => {
  console.log(props);
  const dispatch = useDispatch();
  const classes = useStyles();
  const appState = useSelector((state: any) => state);
  const [error, setError] = React.useState(false);
  const [formIsValid, validateForm] = React.useState(false);
  const [form, setState] = React.useState<Record<string, any>>({
    name: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    email: {
      value: '',
      touched: false,
      valid: false,
      validators: [required, email],
    },
    password: {
      value: '',
      touched: false,
      valid: false,
      validators: [required, length({ min: 5 })],
    },
    confirmPass: {
      value: '',
      touched: false,
      valid: false,
      validators: [required, length({ min: 5 })],
    },
  });


  if (appState.data.redirect === 'login') {
    // dispatch(redirect('testing'));
    // change redirect back to false

    return <Redirect push to="login" />;
    // props.history.push('/');
  }

  const blurHandler = (inputField: string) => {
    setState({
      ...form,
      [inputField]: {
        ...form[inputField],
        touched: true,
      },
    });
  };

  const handleError = (): ReactElement | void => {
    if (appState.error.message) {
      return <MuiAlert severity="error">{appState.error.message}</MuiAlert>;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const input = target.getAttribute('id') || '';
    const { value } = target;
    let isInputValid = true;

    form[input].validators.map((validator: any) => {
      isInputValid = isInputValid && validator(value);
    });

    const updatedForm = {
      ...form,
      [input]: {
        ...form[input],
        valid: isInputValid,
        value,
      },
    };

    const formEntries = Object.entries(form);

    const validations = formEntries.map((item: Record<string, any>) => {
      return item[1].valid;
    });
    const reducer = (acc: boolean, item: boolean): boolean => {
      if (acc && item) {
        return item;
      }
      return false;
    };

    const isFormValid = validations.reduce(reducer, true);

    validateForm(isFormValid);
    setState(updatedForm);
  };

  return (
    <Box display="flex">
      <form
        className={classes.root}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            createUserAction({
              name: form.name.value,
              email: form.email.value,
              password: form.password.value,
            }),
          );
        }}
      >
        <div className={classes.inputField}>
          <TextField
            id="name"
            variant="outlined"
            placeholder="name"
            value={form.name.value}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('name')}
            error={form.name.touched && !form.name.valid}
            required
            fullWidth
            helperText={form.name.touched && !form.name.valid ? 'Must provide user name' : ''}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            id="email"
            variant="outlined"
            placeholder="email address"
            value={form.email.value}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('email')}
            error={form.email.touched && !form.email.valid}
            required
            fullWidth
            helperText={form.email.touched && !form.email.valid ? 'Must provide a valid email address' : ''}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            id="password"
            variant="outlined"
            placeholder="password"
            value={form.password.value}
            onChange={handleInputChange}
            type="password"
            onBlur={(): void => blurHandler('password')}
            error={form.password.touched && !form.password.valid}
            required
            fullWidth
            helperText={form.password.touched && !form.password.valid ? 'Password must be over 5 characters long' : ''}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            id="confirmPass"
            variant="outlined"
            placeholder="confirm password"
            value={form.confirmPass.value}
            onChange={handleInputChange}
            type="password"
            onBlur={(): void => blurHandler('confirmPass')}
            error={form.confirmPass.touched && form.confirmPass.value !== form.password.value}
            required
            fullWidth
            helperText={form.confirmPass.touched && form.confirmPass.value !== form.password.value ? 'Passwords do not match' : ''}
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

export default Signup;