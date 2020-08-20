import React, { useState, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

interface Props {
  players: FFType.LeaguePlayer[];
  onChange: () => void;
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  modal: {
    margin: '20% 25% 25% 25%',
    background: 'white',
    height: '20%',
    outline: 'none',
  },
  innerModal: {
    padding: '2rem',
  },
  modalDeleteButton: {
    float: 'right',
  },
  modalText: {
    textAlign: 'center',
    paddingBottom: '20px',
  },
  deleteButton: {
    float: 'right',
  },
  header: {
    fontWeight: 'bold',
  },
});

const PlayersTable: React.FC<Props> = (props: Props) => {
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
          return player.playerInfo.firstName.toLowerCase().includes(search.toLowerCase())
            || player.playerInfo.lastName.toLowerCase().includes(search.toLowerCase());
        },
      );
    }
    return filteredPlayers.map((player) => {
      return (
        <TableRow key={player.playerInfo.lastName}>
          <TableCell>{player.playerInfo.firstName}</TableCell>
          <TableCell>{player.playerInfo.lastName}</TableCell>
          <TableCell>{`${player.playerInfo.position} ${player.playerInfo.specPositions.length > 0 ? `(${player.playerInfo.specPositions.join(', ')})` : ''}`}</TableCell>
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
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>First Name</TableCell>
            <TableCell className={classes.header}>Last Name</TableCell>
            <TableCell className={classes.header}>Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows()}
        </TableBody>
      </Table>
    </>
  );
};

export default PlayersTable;
