import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Title from '../components/Title';
import joinLeague from '../../data/join-league';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { target: { value } } = event;
    setPasscode(value);
  };

  const handleJoinLeague = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    const joinLeagueSuccess = await joinLeague({ passcode });
    if (!joinLeagueSuccess) {
      setErrorMessage(`Failed to join league. Make sure you're the passcode
      was correct and you are not already a member of a league`);
    } else {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="leagues" />;
  }

  return (
    <form className={classes.root}>
      <Title text="Join League" className={classes.title} />
      <TextField
        id="leaguePasscode"
        variant="outlined"
        label="League Passcode"
        className={classes.textField}
        value={passcode}
        onChange={handleInputChange}
        error={errorMessage !== ''}
        required
        fullWidth
        helperText={errorMessage !== '' ? errorMessage : ''}
      >
        Hello
      </TextField>
      <Button text="Join" clickHandler={handleJoinLeague} />
    </form>
  );
};

export default JoinLeague;
