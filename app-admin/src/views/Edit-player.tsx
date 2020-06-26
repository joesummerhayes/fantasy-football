import React from 'react';

interface Props {
  location: {
    state: FFType.Player;
  };
}

const EditPlayer: React.FC<Props> = (props: Props) => {
  console.log(props);
  const { location } = props;
  const { state } = location;

  return (
    <div>This is the edit player component!</div>
  );
};

export default EditPlayer;
