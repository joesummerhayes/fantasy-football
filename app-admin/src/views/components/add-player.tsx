import React, { ReactNode, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { premTeams, positions } from '../../utils/add-player-data';
import addPlayer from '../../data/add-player';
import editPlayer from '../../data/edit-player';

const useStyles = makeStyles({
  root: {
    width: '50%',
    marginLeft: '25%',
  },
  dropDown: {
    minWidth: '100%',
    paddingTop: '30px',
  },
  field: {
    paddingTop: '30px',
  },
});

interface PlayerForm {
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  usedName: string;
}

interface Props {
  location: {
    state: {
      player: FFType.Player;
      editMode: boolean;
      resetForm: boolean;
    };
  };
}

const AddPlayer: React.FC<Props> = (props: Props): JSX.Element => {
  const firstName = props?.location?.state?.player?.firstName || '';
  const position = props?.location?.state?.player?.position || '';
  const team = props?.location?.state?.player?.team || '';
  const lastName = props?.location?.state?.player?.lastName || '';
  const usedName = props?.location?.state?.player?.usedName || '';
  const _id = props?.location?.state?.player?._id || '';
  const emptyPlayer = {
    _id: '',
    firstName: '',
    lastName: '',
    position: '',
    team: '',
    usedName: '',
  };

  const [redirect, setRedirect] = React.useState({
    on: false,
    team: '',
  });
  const [player, setPlayer] = React.useState<FFType.Player>({
    _id,
    firstName,
    position,
    team,
    lastName,
    usedName,
  });
  const classes = useStyles();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    const { id } = target;
    const updatedPlayer = {
      ...player,
      [id]: value,
    };
    setPlayer(updatedPlayer);
  };

  useEffect(() => {
    if (!props?.location?.state?.editMode) {
      setPlayer(emptyPlayer);
    }
  }, [props?.location?.state?.resetForm]);

  const handleDropDownChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>): void => {
    const { target } = event;
    const { value, name } = target;

    setPlayer({
      ...player,
      [name as string]: value,
    });
  };

  const teamsDropDown = (): ReactNode => {
    return premTeams.map((teamName: string) => {
      return <MenuItem key={teamName} value={teamName}>{teamName}</MenuItem>;
    });
  };

  const positionDropDown = (): ReactNode => {
    return positions.map((pos: string) => {
      return <MenuItem key={pos} value={pos}>{pos}</MenuItem>;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (props?.location?.state?.editMode) {
        await editPlayer(player);
        const teamToRedirect = player.team;
        setPlayer(emptyPlayer);
        setRedirect({ on: true, team: teamToRedirect });
        return;
      }
      await addPlayer(player);
      setPlayer(emptyPlayer);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect.on) {
    return (
      <Redirect
        to={{
          pathname: '/players',
          state: redirect.team,
        }}
      />
    );
  }

  return (
    <Box>
      <form className={classes.root} onSubmit={onSubmit}>
        <div>
          <TextField
            className={classes.field}
            fullWidth
            variant="outlined"
            placeholder="First Name"
            id="firstName"
            value={player.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            className={classes.field}
            fullWidth
            variant="outlined"
            placeholder="Last Name"
            id="lastName"
            value={player.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            className={classes.field}
            fullWidth
            variant="outlined"
            placeholder="Used Name"
            id="usedName"
            value={player.usedName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel id="demo-simple-select-outlined-label" className={classes.dropDown}>Position</InputLabel>
            <Select
              id="position"
              value={player.position}
              onChange={handleDropDownChange}
              name="position"
            >
              {positionDropDown()}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel id="demo-simple-select-outlined-label" className={classes.dropDown}>Team</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="team"
              value={player.team}
              onChange={handleDropDownChange}
              name="team"
            >
              {teamsDropDown()}
            </Select>
          </FormControl>
        </div>
        <Button variant="outlined" color="primary" type="submit">{props?.location?.state?.editMode ? 'Update' : 'Create Player'}</Button>
      </form>
    </Box>
  );
};

export default AddPlayer;
