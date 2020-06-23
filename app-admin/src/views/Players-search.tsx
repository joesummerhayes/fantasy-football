import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { premTeams } from '../utils/add-player-data';
import findPlayers from '../data/find-players';

const useStyles = makeStyles({
  root: {
    width: '50%',
    marginLeft: '25%',
  },
  dropDown: {
    minWidth: '100%',
    paddingTop: '30px',
  },
});

const teamsDropDown = (): ReactNode => {
  return premTeams.map((teamName: string) => {
    return <MenuItem key={teamName} value={teamName}>{teamName}</MenuItem>;
  });
};

const PlayerSelect: React.FC = () => {
  const classes = useStyles();
  const [searchTeam, setSearchTeam] = React.useState<string>('');

  const dropDownHandler = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>): void => {
    const { target } = event;
    const { value } = target;
    setSearchTeam(value as string);

    findPlayers({ teamName: value });

    // loads of logic to search the database and ombit results? or do this in a nother function?
  };

  return (
    <form className={classes.root}>
      <div>
        <FormControl variant="outlined" className={classes.dropDown}>
          <InputLabel id="demo-simple-select-outlined-label" className={classes.dropDown}>Team</InputLabel>
          <Select
            id="team"
            value={searchTeam}
            name="team"
            onChange={dropDownHandler}
          >
            {teamsDropDown()}
          </Select>
        </FormControl>
      </div>
    </form>
  )
};

export default PlayerSelect;
