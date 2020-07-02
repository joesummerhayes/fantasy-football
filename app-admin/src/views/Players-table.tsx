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
import { Link, Redirect } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import deletePlayer from '../data/delete-player';

interface Props {
  players: FFType.PlayerWithTeam[];
  editedPlayerTeam: string;
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

const PlayersTableNew: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [search, setSearch] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [focusedPlayer, setPlayer] = useState({id: '', teamId: '', teamName: ''});

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    setSearch(value);
  };

  const { players, onChange } = props;

  const onModalClick = (player: FFType.PlayerWithTeam): void => {
    setPlayer({
      id: player._id,
      teamId: player.team.id,
      teamName: player.team.name,
    });
    setModal(true);
  };

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
                pathname: '/player',
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
          <TableCell>{`${player.position} ${player.specPositions.length > 0 ? `(${player.specPositions.join(', ')})` : ''}`}</TableCell>
          <TableCell>
            <Button className={classes.deleteButton} variant="contained" color="secondary" onClick={() => onModalClick(player)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleModalClose = (): void => {
    setModal(false);
  };

  const onDeleteClick = async (): Promise<any> => {
    await deletePlayer({ id: focusedPlayer.id, teamId: focusedPlayer.teamId });
    setModal(false);
    onChange();
  };

  return (
    <>
      <TextField
        value={search}
        onChange={onChangeHandler}
      />
      <Table>
        <TableHead>
          <TableCell />
          <TableCell className={classes.header}>First Name</TableCell>
          <TableCell className={classes.header}>Last Name</TableCell>
          <TableCell className={classes.header}>Position</TableCell>
          <TableCell />
        </TableHead>
        <TableBody>
          {rows()}
        </TableBody>
      </Table>
      <Modal
        open={modal}
        onClose={handleModalClose}
      >
        <div className={classes.modal}>
          <div className={classes.innerModal}>
            <div className={classes.modalText}>Are You Sure You Want to Delete Player?</div>
            <Button variant="contained" color="primary" onClick={() => setModal(false)}>
              Back
            </Button>
            <Button variant="contained" color="secondary" onClick={() => onDeleteClick()} className={classes.modalDeleteButton}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlayersTableNew;
