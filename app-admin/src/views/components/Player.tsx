import React, { ReactNode, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Redirect } from 'react-router-dom';
import { positions, findSpecPositions } from '../../utils/add-player-data';
import addPlayer from '../../data/add-player';
import editPlayer from '../../data/edit-player';
import { getErrorAction, clearErrors } from '../../actions/index';
import { AppState } from '../../app-state';

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

interface Props {
  location: {
    state: {
      player: FFType.PlayerWithTeam;
      editMode: boolean;
      resetForm: boolean;
    };
  };
}

const AddPlayer: React.FC<Props> = (props: Props): JSX.Element => {
  const firstName = props?.location?.state?.player?.firstName || '';
  const lastName = props?.location?.state?.player?.lastName || '';
  const position = props?.location?.state?.player?.position || '';
  const specPositions = props?.location?.state?.player?.specPositions || [];
  const teamName = props?.location?.state?.player?.team.name || '';
  const teamId = props?.location?.state?.player?.team._id || '';
  const usedName = props?.location?.state?.player?.usedName || '';
  const _id = props?.location?.state?.player?._id || '';
  const emptyPlayer = {
    _id: '',
    firstName: '',
    lastName: '',
    position: '',
    specPositions: [],
    team: {
      name: '',
      _id: '',
    },
    usedName: '',
  };

  const [redirect, setRedirect] = React.useState({
    on: false,
    team: '',
  });
  const [player, setPlayer] = React.useState<FFType.PlayerWithTeam>({
    _id,
    firstName,
    lastName,
    position,
    specPositions,
    team: {
      name: teamName,
      _id: teamId,
    },
    usedName,
  });
  console.log('!!!', player)
  const classes = useStyles();
  const dispatch = useDispatch();
  const isError = useSelector((state: any) => state.error);
  const premTeams = useSelector((state: AppState) => state.premTeams);

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
    if (props?.location?.state?.editMode) {
      dispatch(clearErrors());
    }
  }, [props?.location?.state?.resetForm]);

  const handleDropDownChange = (event: React.ChangeEvent<{ value: any; name?: string | undefined }>): void => {
    const { target } = event;
    const { value, name: dropDown } = target;
    if (dropDown === 'position') {
      setPlayer({
        ...player,
        ['specPositions' as any]: [],
        [dropDown as string]: value,
      });
      return;
    }
    console.log(value);

    const teamsWithName = premTeams?.filter((premteam) => premteam.name === value);
    if (!teamsWithName) return;
    const team = teamsWithName[0];
    setPlayer({
      ...player,
      [dropDown as string]: {
        ...player.team,
        name: value,
        _id: team._id,
      },
    });
  };

  const teamsDropDown = (premTeams: FFType.PremTeam[]): ReactNode => {
    return premTeams.map((team) => {
      return (
        <MenuItem
          key={team._id}
          // @ts-ignore
          value={team.name}
        >
          {team.name}
        </MenuItem>
      );
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
        console.log('1111', player);
        await editPlayer(player);
        const teamToRedirect = player.team.name;
        setPlayer(emptyPlayer);
        setRedirect({ on: true, team: teamToRedirect });
        return;
      }
      await addPlayer(player);
      dispatch(clearErrors());
      setPlayer(emptyPlayer);
    } catch (error) {
      console.log(error);
      dispatch(getErrorAction(error.specificError));
    }
  };

  const onSpecPositionClick = (event: ChangeEvent<{}>, pos: string): void => {
    if (player.specPositions.includes(pos)) {
      const removePos = player.specPositions.filter((p) => p !== pos);
      setPlayer({
        ...player,
        ['specPositions' as any]: removePos,
      });
      return;
    }

    const newPositions = player.specPositions;
    newPositions.push(pos);
    setPlayer({
      ...player,
      ['specPositions' as any]: newPositions,
    });
  };

  const populateCheckList = (): any => {
    const specificPositions = findSpecPositions(player.position);
    if (!specificPositions) {
      return '';
    }
    return specificPositions.map((pos) => {
      return (
        <FormControlLabel
          control={<Checkbox name={pos} checked={player.specPositions.includes(pos)} onChange={(e) => onSpecPositionClick(e, pos)} />}
          label={pos}
          key={pos}
        />
      );
    });
  };

  const handleError = (): React.ReactElement | void => {
    if (isError.message) {
      return <MuiAlert severity="error">{isError.message}</MuiAlert>;
    }
  };

  if (redirect.on) {
    return (
      <Redirect
        to={{
          pathname: '/players',
          state: {
            afterEdit: redirect.team,
          },
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
          {populateCheckList()}
        </div>
        <div>
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel id="demo-simple-select-outlined-label" className={classes.dropDown}>Team</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="team"
              value={player.team.name}
              onChange={handleDropDownChange}
              name="team"
            >
              {premTeams && teamsDropDown(premTeams)}
            </Select>
          </FormControl>
        </div>
        <Button variant="outlined" color="primary" type="submit" style={{paddingTop: '10px'}}>{props?.location?.state?.editMode ? 'Update' : 'Create Player'}</Button>
        {handleError()}
      </form>
    </Box>
  );
};

export default AddPlayer;
