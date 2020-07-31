import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { required } from '../../utils/validation';
import { gameweeks, getDateInAWeek } from './utils';
import Title from '../components/Title';
import Button from '../components/Button';
import createLeague from '../../data/create-league';

interface CreateLeagueForm {
  draftDate: Date | null;
  gameweekStart: string;
  leagueName: string;
}

interface DraftStartDate {
  value: Date | null;
  valid: boolean;
  touched: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '50%',
  },
  inputField: {
    paddingTop: '2rem',
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
  errorInputText: {
    color: '#f44336',
  },
  title: {
    paddingTop: '3rem',
  },
  draftStartTime: {
    paddingLeft: '10px',
  },
  draftDate: {
    paddingRight: '10px',
  },
  draftDateMargin: {
    marginTop: '0',
  },
  paddingTop: {
    paddingTop: '20px',
  },
}));

const CreateLeague: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [draftDate, setSelectedDate] = React.useState<DraftStartDate>({
    value: getDateInAWeek(),
    touched: true,
    valid: true,
  });
  const [gameweekStart, setGameweekStart] = React.useState<FFType.FormItem>({
    value: '',
    touched: false,
    valid: false,
    validators: [required],
  });
  const [leagueName, setLeagueName] = React.useState<FFType.FormItem>({
    value: '',
    touched: false,
    valid: false,
    validators: [required],
  });

  const blurHandler = (inputField: string): void => {
    if (inputField === 'leagueName') {
      setLeagueName({
        ...leagueName,
        touched: true,
      });
    }
  };

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate({
      touched: true,
      valid: date !== null,
      value: date,
    });
  };

  const dropDownOutput = (listItems: string[]): React.ReactNode => {
    return listItems.map((pos: string) => {
      return <MenuItem key={pos} value={pos}>{pos}</MenuItem>;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const input = target.getAttribute('id') || '';
    const { value } = target;
    if (input === 'leagueName') {
      const updatedLeagueName = {
        ...leagueName,
        value,
        touched: true,
        valid: required(value),
      };
      setLeagueName(updatedLeagueName);
    }
  };

  const handleDropDownChange = (event: React.ChangeEvent<{ value: any }>): void => {
    const { target } = event;
    const { value } = target;
    const updatedGameWeekStart = {
      ...gameweekStart,
      touched: true,
      valid: true,
      value,
    };
    setGameweekStart(updatedGameWeekStart);
  };

  const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setGameweekStart({
      ...gameweekStart,
      touched: true,
    });
    setLeagueName({
      ...leagueName,
      touched: true,
    });
    if (gameweekStart.valid && leagueName.valid && draftDate.valid) {
      // send form to back end
      console.log('passed');
      if (draftDate.value === null) return;
      createLeague({
        draftDate: draftDate.value,
        gameweekStart: gameweekStart.value,
        leagueName: leagueName.value,
      });
      return;
    }
    console.log('failed');
  };

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Title text="Create Your League" className={classes.title} />
        </Grid>
        <Grid item xs={12} className={classes.inputField}>
          <TextField
            id="leagueName"
            variant="outlined"
            label="League Name"
            InputLabelProps={{ className: classes.inputText }}
            value={leagueName.value}
            onChange={handleInputChange}
            onBlur={(): void => blurHandler('leagueName')}
            error={leagueName.touched && !leagueName.valid}
            required
            fullWidth
            helperText={leagueName.touched && !leagueName.valid ? 'You must give your league a name' : ''}
          />
        </Grid>
        <Grid item xs={6} className={`${classes.draftDate} ${classes.inputField}`}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.draftDateMargin}
              disablePast
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Draft Date"
              fullWidth
              value={draftDate.value}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              required
              error={!draftDate.valid && draftDate.touched}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6} className={`${classes.draftStartTime} ${classes.inputField}`}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              className={classes.draftDateMargin}
              margin="normal"
              fullWidth
              ampm={false}
              id="time-picker"
              label="Draft Start Time"
              value={draftDate.value}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              required
              error={!draftDate.valid}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} className={classes.inputField}>
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel
              required
              className={!gameweekStart.valid && gameweekStart.touched ? classes.errorInputText : classes.inputText}
            >
              First Gameweek
            </InputLabel>
            <Select
              onChange={handleDropDownChange}
              value={gameweekStart.value}
              error={!gameweekStart.valid && gameweekStart.touched}
            >
              {dropDownOutput(gameweeks)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button text="Create League" clickHandler={onFormSubmit} bigButtonDark className={classes.submitButton} />
    </form>
  );
};

export default CreateLeague;
