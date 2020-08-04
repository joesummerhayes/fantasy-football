import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CreateLeague from './create-league';
import JoinLeague from './join-league';
import { AppState } from '../../app-state';
import withLoading from '../HOC/with-loading';
import Loading from '../components/Loading';
import LeagueDetails from './league-details';
import Center from '../components/Center';
import Button from '../components/Button';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  button: {
    margin: '2rem 1rem 2rem 0',
  },
}));

const Leagues = (): JSX.Element | null => {
  const classes = useStyles();
  const league = useSelector((state: AppState) => state?.user?.userDetails?.league);

  if (league === undefined) {
    return <Loading />;
  }

  const joinLeagueClick = () => {
    console.log('direct to join league page');
  }

  const createLeagueClick = () => {
    console.log('direct to create league page');
  }

  return (
    <div className={classes.root}>
      <Button text="Join League" clickHandler={joinLeagueClick} className={classes.button} />
      <Button text="Create League" clickHandler={createLeagueClick} className={classes.button} />
      { league && <Center><LeagueDetails /></Center> }
      { !league && <CreateLeague /> }
    </div>
  );
};

export default Leagues;
