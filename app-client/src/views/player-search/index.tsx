import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { premTeams } from '../utils/data';
import findPlayers from '../../data/find-players';
import PlayersTable from './player-table';

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

interface Props {
  location: {
    state: {
      afterEdit: string;
    };
  };
}

const PlayerSelect: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [searchTeam, setSearchTeam] = React.useState<string>('');
  const [squadPlayers, setSquadPlayers] = React.useState<FFType.PlayerWithTeam[]>([]);

  const dropDownHandler = async (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>): Promise<void> => {
    const { target } = event;
    const { value } = target;
    setSearchTeam(value as string);
    try {
      const players = await findPlayers({ teamName: value as string });
      setSquadPlayers(players);
    } catch (error) {
      setSquadPlayers([]);
      console.log(error);
    }
  };

  const handleRefresh = async (): Promise<void> => {
    const players = await findPlayers({ teamName: searchTeam as string });
    setSquadPlayers(players);
  };

  return (
    <>
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
      <PlayersTable players={squadPlayers} onChange={handleRefresh} />
    </>
  );
};

export default PlayerSelect;
