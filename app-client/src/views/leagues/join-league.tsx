import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Title from '../components/Title';

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem',
    margin: 'auto',
    width: '50%',
  },
  title: {
    paddingBottom: '1rem',
  },
  textField: {
    paddingBottom: '1rem',
  },
});

const JoinLeague: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [passcode, setPasscode] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { target: { value } } = event;
    setPasscode(value);
  };

  const handleJoinLeague = (): void => {
    console.log('join league');
  };

  return (
    <form className={classes.root}>
      <Title text="Join League" className={classes.title} />
      <TextField
        id="leaguePasscode"
        variant="outlined"
        label="League Passcode"
        className={classes.textField}
        // InputLabelProps={{ className: classes.inputText }}
        value={passcode}
        onChange={handleInputChange}
        // onBlur={(): void => blurHandler('leagueName')}
        // error={leagueName.touched && !leagueName.valid}
        required
        fullWidth
        // helperText={leagueName.touched && !leagueName.valid ? 'You must give your league a name' : ''}
      >
        Hello
      </TextField>
      <Button text="Join" clickHandler={handleJoinLeague} />
    </form>
  );
};

export default JoinLeague;
