import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { required, formValidationCheck } from '../../utils/validation';
import { getErrorAction } from '../../actions/index';
import { stylesOfPlay, kitColours } from '../../utils/create-team-data';
import createTeam from '../../data/create-team';
import Button from '../components/Button';
import Title from '../components/Title';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    width: '50%',
  },
  inputField: {
    paddingTop: '1rem',
  },
  submitButton: {
    marginTop: '2rem',
  },
  dropDown: {
    width: '100%',
  },
  inputText: {
    color: 'black',
  },
  title: {
    paddingTop: '3rem',
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
    setForm(updatedForm);
    const validForm = formValidationCheck(updatedForm);
    validateForm(validForm);
  };

  const styleOfPlayDropDown = (listItems: string[]): React.ReactNode => {
    return listItems.map((pos: string) => {
      return <MenuItem key={pos} value={pos}>{pos}</MenuItem>;
    });
  };

  const handleDropDownChange = (event: React.ChangeEvent<{ value: any; name?: string | undefined }>): void => {
    const { target } = event;
    const { value, name } = target;
    if (!name) return undefined;
    const newForm = {
      ...form,
      [name]: {
        ...form[name],
        value,
        touched: true,
        valid: true,
      },
    };
    const validForm = formValidationCheck(newForm);
    setForm(newForm);
    validateForm(validForm);
  };

  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setForm({
      ...form,
      styleOfPlay: {
        ...form.styleOfPlay,
        touched: true,
      },
      kitColour: {
        ...form.kitColour,
        touched: true,
      },
    });

    if (formIsValid) {
      const validTeamValues = {
        clubMotto: form.clubMotto.value,
        styleOfPlay: form.styleOfPlay.value,
        teamName: form.teamName.value,
        kitColour: form.kitColour.value,
        stadiumName: form.stadiumName.value,
      };
      createTeam(validTeamValues);
    } else {
      // call the error action creator so i can display error at the bottom of form?
    }
  };

  return (
    <Box display="flex">
      <form
        className={classes.root}
        onSubmit={() => onSubmitHandler}
      >
        <Title text="Create Your Team" className={classes.title} />
        <div className={classes.inputField}>
          <TextField
            id="teamName"
            variant="outlined"
            label="Team Name"
            InputLabelProps={{ className: classes.inputText }}
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
            label="Club Motto"
            InputLabelProps={{ className: classes.inputText }}
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
            label="Stadium Name"
            InputLabelProps={{ className: classes.inputText }}
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
          <FormControl variant="outlined" className={classes.dropDown} error={form.styleOfPlay.valid === false && form.styleOfPlay.touched === true}>
            <InputLabel required className={classes.inputText}>Style Of Play</InputLabel>
            <Select
              value={form.styleOfPlay.value}
              onChange={handleDropDownChange}
              name="styleOfPlay"
              label="Style of Play"
            >
              {styleOfPlayDropDown(stylesOfPlay)}
            </Select>
          </FormControl>
        </div>
        <div className={classes.inputField}>
          <FormControl variant="outlined" className={classes.dropDown} error={form.kitColour.valid === false && form.kitColour.touched === true}>
            <InputLabel required className={classes.inputText}>Kit Colour</InputLabel>
            <Select
              value={form.kitColour.value}
              onChange={handleDropDownChange}
              name="kitColour"
              label="Kit Colour"
            >
              {styleOfPlayDropDown(kitColours)}
            </Select>
          </FormControl>
        </div>
        {handleError()}
        <Button text="Create Team" clickHandler={onSubmitHandler} className={classes.submitButton} />
      </form>
    </Box>
  );
};

export default CreateTeam;

