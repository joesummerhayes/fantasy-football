import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button';

const useStyles = makeStyles((theme) => ({
  leagueButton: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 'inherit',
  },
}));

const LeagueButton: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const onButtonClick = (): void => {
    console.log('click');
  };

  return (
    <Button text="Join / Create League" onClick={onButtonClick} className={classes.leagueButton} />
  );
};

export default LeagueButton;
