import graphQL from './graph-ql';

interface PlayerQlResult {
  editPlayer: FFType.Player;
}

const editPlayer = async (variables: any): Promise<FFType.Player> => {
  const response = await graphQL.query<PlayerQlResult>(`
    mutation addNewPlayer($_id: String, $firstName: String!, $lastName: String!, $position: String!, $specPositions: [String]!, $team: String!, $usedName: String!) {
      editPlayer(playerInput: {_id: $_id, firstName: $firstName, lastName: $lastName, position: $position, specPositions: $specPositions, team: $team, usedName: $usedName}) {
        _id
        firstName
        lastName
        position
        specPositions
        team
        usedName
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem editing player');
  }
  return response.editPlayer;
};

export default editPlayer;
