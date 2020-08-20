import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { AppState } from '../../app-state';
import Button from '../components/Button';
import PlayerBidModal from './Player-Bid-Modal';

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
  marginRight: {
    marginRight: '5px',
  },
  modal: {
    margin: '20% 30% 25% 30%',
    background: 'white',
    height: '20%',
    outline: 'none',
  },
  innerModal: {
    padding: '2rem',
  },
  bigInput: {
    paddingBottom: '5px',
  },
  placeBidButton: {
    float: 'right',
  },
}));

interface PlayersTableProps {
  players: FFType.LeaguePlayer[];
}

const PlayersTable: React.FC<PlayersTableProps> = (props: PlayersTableProps) => {
  const classes = useStyles();
  const league = useSelector((state: AppState) => state?.user?.userDetails?.draftLeague?.league);
  const [searchTerm, setSearch] = useState<string>('');
  const [model, setModal] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  const { players } = props;

  const makeBidOnClick = (): void => {
    // setModal(true);
    setOpen(true);
    console.log('make bid');
  };

  const getDetailsOnClick = (): void => {
    console.log('get details');
  };

  const rows = (): ReactElement[] => {
    let filteredPlayers = players;
    if (searchTerm !== '') {
      filteredPlayers = players.filter(
        (player) => {
          return player.playerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            || player.playerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        },
      );
    }
    return filteredPlayers.map((player) => {
      return (
        <TableRow key={player.playerInfo._id}>
          <TableCell><Typography>{player.playerInfo.lastName}</Typography></TableCell>
          <TableCell><Typography>{player.playerInfo.position}</Typography></TableCell>
          <TableCell><Typography>{player.playerInfo.specPositions.length > 0 ? `${player.playerInfo.specPositions.join(', ')}` : ''}</Typography></TableCell>
          <TableCell><Typography>£XXXX.XX</Typography></TableCell>
          <TableCell>
            {league && <Button text="Make Bid" clickHandler={makeBidOnClick} smallButtonSecondary className={classes.marginRight} />}
            <Button text="Details" clickHandler={getDetailsOnClick} smallButtonSecondary />
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
    <>
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
                inputProps={{ style: { padding: '0' } }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows()}
        </TableBody>
      </Table>
      <PlayerBidModal setOpen={setOpen} open={open} />
    </>
  );
};

export default PlayersTable;
