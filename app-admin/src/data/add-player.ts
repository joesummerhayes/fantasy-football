import graphQL from './graph-ql';

interface PlayerQlResult {
  player: FFType.Player;
}

const addPlayer = async (variables: any): Promise<FFType.Player> => {
  console.log('trying to add player on front end');
  const response = await graphQL.query<PlayerQlResult>(`
    mutation addNewPlayer($firstName: String!, $lastName: String!, $position: String!, $team: String!, $usedName: String!) {
      addPlayer(playerInput: {firstName: $firstName, lastName: $lastName, position: $position, team: $team, usedName: $usedName}) {
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
    throw new Error('There was a problem adding player');
  }
  return response.player;
};

export default addPlayer;
