import React from 'react';
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

const PlayersTable: React.FC = () => {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Name', field: 'name'},
      { title: 'Position', field: 'position'},
      { title: 'Team', field: 'team'},
    ],
    data: [
      { name: 'Harry Kane', position: 'Forward', team: 'Tottenham Hotspur' },
      { name: 'Mousa Sissoko', position: 'Midfield', team: 'Tottenham Hotspur' },
      { name: 'Ben Davies', position: 'Defender', team: 'Tottenham Hotspur' },
    ],
  });

  return (
    <MaterialTable
      title="PlayersTable"
      columns={state.columns}
      data={state.data}
    />
  );
};

export default PlayersTable;
