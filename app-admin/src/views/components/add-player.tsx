import React from 'react';

const AddPlayer: React.FC = (): JSX.Element => {
  return (
    <form>
      <div>
        name
        <input />
      </div>
      <div>
        position
        <input />
      </div>
      <div>
        club
        <input />
      </div>
      <button type="button">Add Player</button>
    </form>
  );
};

export default AddPlayer;
