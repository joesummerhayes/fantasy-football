import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Paper, Typography, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppState } from '../../app-state';
import getLeague from '../../data/get-league';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '70vw',
  },
  headerCopy: {
    float: 'left',
    fontWeight: 'bold',
  },
  leagueName: {
    fontWeight: 'bold',
  },
}));

const LeagueDetails: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const leagueInfo = useSelector((state: AppState) => state.user?.userDetails?.draftLeague?.league);
  const [poo, setPoo] = React.useState({});

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const foo = await getLeague();
      setPoo(foo);
    };
    fetchData();
  }, []);

  console.log(poo);

  return (
    <div className={classes.root}>
      <Typography className={classes.leagueName}>
        {leagueInfo?.leagueInfo?.leagueName}
      </Typography>
      <Typography>
        {`League passcode: ${leagueInfo?.leagueInfo?.passcode}`}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.headerCopy}>Rank</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.headerCopy}>Team Name</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.headerCopy}>Gameweek Points</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.headerCopy}>Overall Points</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};

export default LeagueDetails;
