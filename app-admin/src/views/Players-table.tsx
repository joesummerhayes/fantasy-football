import React, { useState, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

interface Props {
  players: FFType.Player[];
  editedPlayerTeam: string;
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white',
  },
});

const PlayersTableNew: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [search, setSearch] = useState<string>('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    setSearch(value);
  };

  const { players } = props;

  const rows = (): ReactElement[] => {
    let filteredPlayers = players;
    if (search !== '') {
      filteredPlayers = players.filter(
        (player) => {
          return player.firstName.toLowerCase().includes(search.toLowerCase())
            || player.lastName.toLowerCase().includes(search.toLowerCase());
        },
      );
    }
    return filteredPlayers.map((player) => {
      return (
        <TableRow key={player.lastName}>
          <TableCell>
            <Link
              to={{
                pathname: '/add-player',
                state: {
                  player,
                  editMode: true,
                },
              }}
              className={classes.link}
            >
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Link>
          </TableCell>
          <TableCell>{player.firstName}</TableCell>
          <TableCell>{player.lastName}</TableCell>
          <TableCell>{player.position}</TableCell>
          <TableCell>{player.team}</TableCell>
        </TableRow>
      );
    });
  };
  return (
    <>
      <TextField
        value={search}
        onChange={onChangeHandler}
      />
      <Table>
        <TableBody>
          {rows()}
        </TableBody>
      </Table>
    </>
  );
};

export default PlayersTableNew;
