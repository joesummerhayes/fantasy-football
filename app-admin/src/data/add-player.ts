import graphQL from './graph-ql';

interface PlayerQlResult {
  addPlayer: FFType.PlayerWithTeam;
}

const addPlayer = async (variables: any): Promise<FFType.PlayerWithTeam> => {
  const response = await graphQL.query<PlayerQlResult>(`
    mutation addNewPlayer($firstName: String!, $lastName: String!, $position: String!, $specPositions: [String]! $team: String!, $usedName: String!) {
      addPlayer(playerInput: {firstName: $firstName, lastName: $lastName, position: $position, specPositions: $specPositions, team: $team, usedName: $usedName}) {
        _id
        firstName
        lastName
        position
        specPositions
        team {
          name
          teamId
        }
        usedName
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem adding player');
  }
  return response.addPlayer;
};

export default addPlayer;
