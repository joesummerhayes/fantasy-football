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
import LinkButton from '../components/LinkButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '2rem',
  },
  button: {
    margin: '2rem 1rem 2rem 0',
  },
}));

const Leagues = (): JSX.Element | null => {
  const classes = useStyles();
  const appState = useSelector((state: AppState) => state?.user?.userDetails?.draftLeague);
  const league = useSelector((state: AppState) => state?.user?.userDetails?.draftLeague?.league);

  if (appState === undefined) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      {!league && <LinkButton text="Join League" to="/join-league" className={classes.button} />}
      {!league && <LinkButton text="Create League" to="/create-league" className={classes.button} />}
      { league && <Center><LeagueDetails /></Center> }
    </div>
  );
};

export default Leagues;
