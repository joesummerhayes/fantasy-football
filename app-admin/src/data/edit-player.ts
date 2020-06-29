import graphQL from './graph-ql';

interface PlayerQlResult {
  player: FFType.Player;
}

const editPlayer = async (variables: any): Promise<FFType.Player> => {
  console.log('trying to add player on front end');
  const response = await graphQL.query<PlayerQlResult>(`
    mutation addNewPlayer($_id: String, $firstName: String!, $lastName: String!, $position: String!, $team: String!, $usedName: String!) {
      editPlayer(playerInput: {_id: $_id, firstName: $firstName, lastName: $lastName, position: $position, team: $team, usedName: $usedName}) {
        _id
        firstName
        lastName
        position
        team
        usedName
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem editing player');
  }
  console.log('SUCESS EDITING PLAYER', response.player);
  return response.player;
};

export default editPlayer;
