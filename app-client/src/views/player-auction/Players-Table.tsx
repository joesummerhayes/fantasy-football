import React, { ReactElement, useState } from 'react';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '../components/Button';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.secondary.light,
    border: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  labelProps: {
    color: 'black',
  },
  searchBar: {
    padding: '0',
  },
}));

interface PlayersTableProps {
  players: FFType.PlayerWithTeam[];
}

const PlayersTable: React.FC<PlayersTableProps> = (props: PlayersTableProps) => {
  const classes = useStyles();
  const [searchTerm, setSearch] = useState<string>('');
  const { players } = props;
  console.log(players);

  const makeBidOnClick = (): void => {
    console.log('make bid');
  };

  const rows = (): ReactElement[] => {
    let filteredPlayers = players;
    if (searchTerm !== '') {
      filteredPlayers = players.filter(
        (player) => {
          return player.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            || player.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        },
      );
    }
    return filteredPlayers.map((player) => {
      return (
        <TableRow key={player._id}>
          <TableCell><Typography>{player.lastName}</Typography></TableCell>
          <TableCell><Typography>{player.position}</Typography></TableCell>
          <TableCell><Typography>{player.specPositions.length > 0 ? `${player.specPositions.join(', ')}` : ''}</Typography></TableCell>
          <TableCell><Typography>£XXXX.XX</Typography></TableCell>
          <TableCell>
            <Button text="Make Bid" onClick={makeBidOnClick} smallButtonSecondary />
            <Button text="Details" onClick={makeBidOnClick} smallButtonSecondary />
          </TableCell>
        </TableRow>
      );
    });
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    setSearch(value);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.header}>
            <Typography className={classes.bold}>
              Player
            </Typography>
          </TableCell>
          <TableCell className={classes.header}>
            <Typography className={classes.bold}>
              Position
            </Typography>
          </TableCell>
          <TableCell className={classes.header}>
            <Typography className={classes.bold}>
              Role
            </Typography>
          </TableCell>
          <TableCell className={classes.header}>
            <Typography className={classes.bold}>
              Min Bid
            </Typography>
          </TableCell>
          <TableCell className={classes.header}>
            <TextField
              className={classes.searchBar}
              onChange={onChangeHandler}
              value={searchTerm}
              inputProps={{ style: {padding: '0'} }}
              // label="Search for Player"
              // InputLabelProps={{ className: classes.labelProps }}
            />
          </TableCell>
          {/* <TableCell className={classes.header}>
            <Typography className={classes.bold}>
              Search for player
            </Typography>
          </TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows()}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;
