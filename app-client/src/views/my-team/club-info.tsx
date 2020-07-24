import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {AppState } from '../../app-state';

const userStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  floatRight: {
    float: 'right',
    paddingRight: '2rem',
  },
  floatLeft: {
    paddingLeft: '2rem',
  },
  header: {
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontSize: '1.3rem',
    paddingBottom: '1vh',
  },
  bold: {
    fontWeight: 'bold',
  },
  sameLine: {
    display: 'flex',
    whiteSpace: 'pre',
    textTransform: 'capitalize',
  },
}));

const ClubInfo: React.FC = (): JSX.Element => {
  const classes = userStyles();
  const { user } = useSelector((appState: AppState) => appState);
  const teamInfo = user?.userDetails?.team?.info;

  if (!teamInfo) return <div>No Team Found</div>;

  const { clubMotto, kitColour, stadiumName, styleOfPlay, teamName } = teamInfo;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Typography className={`${classes.floatLeft} ${classes.header}`}>{teamName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={`${classes.floatRight} ${classes.header}`}>Points</Typography>
        </Grid>
        <Grid item xs={6}>
          <div className={`${classes.sameLine} ${classes.floatLeft}`}>
            <Typography>Club Motto: </Typography>
            <Typography className={classes.bold}>{clubMotto}</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={`${classes.sameLine} ${classes.floatRight}`}>
            <Typography>Overall Points: </Typography>
            <Typography className={classes.bold}>236</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={`${classes.sameLine} ${classes.floatLeft}`}>
            <Typography>Style of Play: </Typography>
            <Typography className={classes.bold}>{styleOfPlay}</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={`${classes.sameLine} ${classes.floatRight}`}>
            <Typography>Gameweek Points: </Typography>
            <Typography className={classes.bold}>35</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClubInfo;
