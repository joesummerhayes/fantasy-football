import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import premTeams from '../../utils/teams';

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
  name: string;
  position: string;
  team: string;
}

const AddPlayer: React.FC = (): JSX.Element => {
  const [player, setPlayer] = React.useState<PlayerForm>({
    name: '',
    position: '',
    team: '',
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

  const handleDropDownChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const { target } = event;
    const { value } = target;
    const team = 'team';

    setPlayer({
      ...player,
      [team as string]: value,
    });
  };

  const teamsDropDown = (): ReactNode => {
    return premTeams.map((teamName: string) => {
      return <MenuItem value={teamName}>{teamName}</MenuItem>;
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
            placeholder="name"
            id="name"
            value={player.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            className={classes.field}
            fullWidth
            variant="outlined"
            placeholder="position"
            id="position"
            value={player.position}
            onChange={handleInputChange}
          />
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
