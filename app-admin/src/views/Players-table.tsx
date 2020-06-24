import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  name: string;
  position: string;
  team: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface Props {
  players: FFType.Player[];
}

const PlayersTable: React.FC<Props> = (props: Props) => {
  const { players } = props;
  const playerRows = players.map((player) => {
    return { name: `${player.firstName} ${player.lastName}`, position: player.position, team: player.team };
  });


  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Position', field: 'position' },
      { title: 'Team', field: 'team' },
    ],
    data: playerRows,
  });

  useEffect(() => {
    setState({
      ...state,
      data: playerRows,
    });
  }, [props?.players]);

  return (
    <MaterialTable
      title="PlayersTable"
      columns={state.columns}
      data={state.data}
    />
  );
};

export default PlayersTable;
