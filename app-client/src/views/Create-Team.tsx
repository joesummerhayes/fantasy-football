import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { required, length, email, confirmPass } from '../utils/validation';
import { createUserAction } from '../actions/index';
import { stylesOfPlay, kitColours } from '../utils/create-team-data';

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
  dropDown: {
    width: '100%',
  },
});

const CreateTeam = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isError = useSelector((state: any) => state.error);
  const [formIsValid, validateForm] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, FFType.FormItem>>({
    clubMotto: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    kitColour: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    teamName: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    stadiumName: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    styleOfPlay: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
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
    if (isError.errorLocation === 'createUser') {
      return <MuiAlert severity="error">{isError.specificError}</MuiAlert>;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const input = target.getAttribute('id') || '';
    const { value } = target;
    let isInputValid = true;

    form[input].validators.map((validator: FFType.Validator): void => {
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

    const formEntries: [string, FFType.FormItem][] = Object.entries(updatedForm);

    const validations = formEntries.map((item: [string, FFType.FormItem]) => {
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

  const styleOfPlayDropDown = (listItems: string[]): React.ReactNode => {
    return listItems.map((pos: string) => {
      return <MenuItem key={pos} value={pos}>{pos}</MenuItem>;
    });
  };

  const handleDropDownChange = (event: React.ChangeEvent<{ value: any; name?: string | undefined }>): void => {
    const { target } = event;
    const { value, name } = target;
    console.log(value, name);
    if (!name) return undefined;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value,
        touched: true,
        valid: true,
      },
    });
  };

  return (
    <Box display="flex">
      <form
        className={classes.root}
        // onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
        //   e.preventDefault();
        //   if (formIsValid) {
        //     dispatch(
        //       createUserAction({
        //         name: form.name.value,
        //         email: form.email.value,
        //         password: form.password.value,
        //       }),
        //     );
        //   }
        // }}
      >
        <div className={classes.inputField}>
          <TextField
            id="teamName"
            variant="outlined"
            placeholder="team name"
            value={form.teamName.value}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('teamName')}
            error={form.teamName.touched && !form.teamName.valid}
            required
            fullWidth
            helperText={form.teamName.touched && !form.teamName.valid ? 'Must provide user team name' : ''}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            id="clubMotto"
            variant="outlined"
            placeholder="club motto"
            value={form.clubMotto.value}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('clubMotto')}
            error={form.clubMotto.touched && !form.clubMotto.valid}
            required
            fullWidth
            helperText={form.clubMotto.touched && !form.clubMotto.valid ? 'Must provide a club motto' : ''}
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            id="stadiumName"
            variant="outlined"
            placeholder="stadium name"
            value={form.stadiumName.value}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('stadiumName')}
            error={form.stadiumName.touched && !form.stadiumName.valid}
            required
            fullWidth
            helperText={form.stadiumName.touched && !form.stadiumName.valid ? 'Must provide a name for your stadium' : ''}
          />
        </div>
        <div className={classes.inputField}>
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel id="demo-simple-select-outlined-label">Style Of Play</InputLabel>
            <Select
              id="style of play"
              value={form.styleOfPlay.value}
              onChange={handleDropDownChange}
              name="styleOfPlay"
            >
              {styleOfPlayDropDown(stylesOfPlay)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.inputField}>
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel id="demo-simple-select-outlined-label">Kit Colour</InputLabel>
            <Select
              id="kit colour"
              value={form.kitColour.value}
              onChange={handleDropDownChange}
              name="kitColour"
            >
              {styleOfPlayDropDown(kitColours)}
            </Select>
          </FormControl>
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

export default CreateTeam;

