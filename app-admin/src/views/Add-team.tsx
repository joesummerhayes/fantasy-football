import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const AddTeam: React.FC = () => {
  const [team, setTeam] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = event;
    setTeam(value);
  };

  return (
    <div style={{width: '50%'}}>
      <TextField
        fullWidth
        variant="outlined"
        value={team}
        placeholder="team name"
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
      >
        Add Team
      </Button>
    </div>
  );
};

export default AddTeam;
