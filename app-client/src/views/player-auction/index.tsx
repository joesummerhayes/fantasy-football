import React, { useState } from 'react';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { premTeams } from '../utils/data';
import PlayersTable from './Players-Table';
import findPlayers from '../../data/find-players';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 5rem 0 5rem',
  },
  teamNameList: {
    padding: '5px',
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'pointer',
    },
  },
  activeTeam: {
    fontSize: '1.2rem',
    padding: '5px',
    backgroundColor: theme.palette.secondary.light,
    cursor: 'pointer',
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    padding: '16px',
    fontWeight: 'bold',
  },
  teamsBox: {
    marginTop: '5px',
  },
  colTeams: {
    paddingRight: '10px',
  },
}));

const PlayerAuction: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [activeTeam, selectTeam] = useState('');
  const [teamPlayers, setteamPlayers] = React.useState<FFType.LeaguePlayer[]>([]);

  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    if (!success) {
      setOpen(true);
    }
  };

  const onTeamSelect = async (team: string): Promise<void> => {
    selectTeam(team);
    const dbPlayers = await findPlayers({ teamName: team });
    console.log('222', dbPlayers)
    setteamPlayers(dbPlayers);
  };

  const renderPremTeamsList = (): any => {
    return premTeams.map((team) => {
      return (
        <Typography className={`${team === activeTeam ? classes.activeTeam : classes.teamNameList}`} onClick={(): Promise<void> => onTeamSelect(team)}>
          {team}
        </Typography>
      );
    });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} className={classes.colTeams}>
          <Typography className={classes.header}>Team</Typography>
          <Box border={1} className={classes.teamsBox}>
            {renderPremTeamsList()}
          </Box>
        </Grid>
        <Grid item xs={10}>
          <PlayersTable players={teamPlayers} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayerAuction;
