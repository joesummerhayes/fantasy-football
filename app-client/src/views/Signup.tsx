import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { required, length, email } from '../utils/validation';

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
  console.log('My State: ', form, formIsValid);

  const blurHandler = (inputField: string) => {
    setState({
      ...form,
      [inputField]: {
        ...form[inputField],
        touched: true,
      },
    });
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

  const submitSignup = () => {
    const graphqlQuery = {
      query: `
        mutation createNewUser($name: String!, $email: String!, $password: String!){
          createUser(userInput: {name: $name, email: $email, password: $password}) {
            _id
            name
            email
            password
          }
        }
      `,
      variables: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    };
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box display="flex">
      <form className={classes.root}>
        <div className={classes.inputField}>
          <TextField
            id="name"
            variant="outlined"
            placeholder="name"
            value={form.name.value}
            onChange={handleInputChange}
            onBlur={() => blurHandler('name')}
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
            onBlur={() => blurHandler('email')}
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
            onBlur={() => blurHandler('password')}
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
            onBlur={() => blurHandler('confirmPass')}
            error={form.confirmPass.touched && form.confirmPass.value !== form.password.value}
            required
            fullWidth
            helperText={form.confirmPass.touched && form.confirmPass.value !== form.password.value ? 'Passwords do not match' : ''}
          />
        </div>
        <Button variant="contained" onClick={submitSignup}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
