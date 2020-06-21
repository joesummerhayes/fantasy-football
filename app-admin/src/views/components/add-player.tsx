import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { premTeams, positions } from '../../utils/add-player-data';

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
}

const AddPlayer: React.FC = (): JSX.Element => {
  const [player, setPlayer] = React.useState<PlayerForm>({
    firstName: '',
    position: '',
    team: '',
    lastName: '',
  });
  const classes = useStyles();

  console.log(player);

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

  const handleDropDownChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>): void => {
    const { target } = event;
    const { value, name } = target;
    console.log(name, value);

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
    return positions.map((position: string) => {
      return <MenuItem key={position} value={position}>{position}</MenuItem>;
    });
  };

  return (
    <Box>
      <form className={classes.root}>
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
          <FormControl variant="outlined" className={classes.dropDown}>
            <InputLabel id="demo-simple-select-outlined-label" className={classes.dropDown}>Position</InputLabel>
            <Select
              id="position"
              value={player.position}
              onChange={handleDropDownChange}
              label="Age"
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
              label="Age"
              name="team"
            >
              {teamsDropDown()}
            </Select>
          </FormControl>
        </div>
        <Button variant="outlined" color="primary">Enter</Button>
      </form>
    </Box>
  );
};

export default AddPlayer;
