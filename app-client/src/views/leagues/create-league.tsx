import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { required } from '../../utils/validation';
import Title from '../components/Title';

const useStyles = makeStyles((theme) => ({
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
}));

const CreateLeague: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [formIsValid, validateForm] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, FFType.FormItem>>({
    leagueName: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    draftStart: {
      value: '',
      touched: false,
      valid: false,
      validators: [required],
    },
    gameweekStart: {
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

  return (
    <Box display="flex">
      <form className={classes.root}>
        <Title text="Create Your Team" className={classes.title} />
        <div className={classes.inputField}>
          <TextField
            id="leagueName"
            variant="outlined"
            label="League Name"
            InputLabelProps={{ className: classes.inputText }}
            value={form.leagueName.value}
            // onChange={handleInputChange}
            onBlur={(): void => blurHandler('leagueName')}
            // error={form.teamName.touched && !form.teamName.valid}
            required
            fullWidth
            // helperText={form.teamName.touched && !form.teamName.valid ? 'Must provide user team name' : ''}
          />
        </div>
      </form>
    </Box>
  );
};

export default CreateLeague;
