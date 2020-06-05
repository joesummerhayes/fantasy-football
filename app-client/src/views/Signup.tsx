import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { required, length, email, confirmPass } from '../utils/validation';
import { createUserAction } from '../actions/index';

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

interface Validator {
  (arg: string): boolean;
}

interface Foo {
  value: string;
  touched: boolean;
  valid: boolean;
  validators: Validator[];
}

const Signup = (): ReactElement => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isError = useSelector((state: any) => state.error);
  const [formIsValid, validateForm] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, Foo>>({
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
    if (isError.message) {
      return <MuiAlert severity="error">{isError.message}</MuiAlert>;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const input = target.getAttribute('id') || '';
    const { value } = target;
    let isInputValid = true;

    form[input].validators.map((validator: Validator) => {
      isInputValid = isInputValid && validator(value);
    });

    if (input === 'confirmPass') {
      isInputValid = isInputValid && confirmPass(form.password.value, value);
    }

    const updatedForm = {
      ...form,
      [input]: {
        ...form[input],
        valid: isInputValid,
        value,
      },
    };

    const formEntries = Object.entries(updatedForm);

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
    setForm(updatedForm);
  };

  return (
    <Box display="flex">
      <form
        className={classes.root}
        onSubmit={(e) => {
          e.preventDefault();
          if (formIsValid) {
            dispatch(
              createUserAction({
                name: form.name.value,
                email: form.email.value,
                password: form.password.value,
              }),
            );
          }
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
