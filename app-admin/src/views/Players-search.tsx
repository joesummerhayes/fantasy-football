import React, { ReactNode, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { premTeams } from '../utils/add-player-data';
import findPlayers from '../data/find-players';
import PlayersTable from './Players-table';

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
  const editedPlayerTeam = props?.location?.state?.afterEdit;
  const classes = useStyles();
  const [searchTeam, setSearchTeam] = React.useState<string>('');
  const [squadPlayers, setSquadPlayers] = React.useState<FFType.PlayerWithTeam[]>([]);

  const handleRefresh = async (): Promise<void> => {
    const players = await findPlayers({ teamName: searchTeam });
    setSquadPlayers(players);
  };

  const dropDownHandler = async (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>): Promise<void> => {
    const { target } = event;
    const { value } = target;
    setSearchTeam(value as string);
    try {
      const players = await findPlayers({ teamName: value });
      setSquadPlayers(players);
    } catch (error) {
      setSquadPlayers([]);
      console.log(error);
    }
  };

  const dropDownHandlerAfterEdit = async (): Promise<void> => {
    try {
      setSearchTeam(editedPlayerTeam);
      const players = await findPlayers({ teamName: editedPlayerTeam });
      setSquadPlayers(players);
    } catch (error) {
      setSquadPlayers([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (editedPlayerTeam !== undefined) {
      dropDownHandlerAfterEdit();
    }
  }, [editedPlayerTeam]);

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
      <PlayersTable players={squadPlayers} editedPlayerTeam={editedPlayerTeam} onChange={handleRefresh} />
    </>
  );
};

export default PlayerSelect;
