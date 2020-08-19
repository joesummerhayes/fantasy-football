import graphQL from './graph-ql';

interface FindPlayersQlResult {
  getPlayers: FFType.PlayerWithTeam[];
}

interface FindPlayersVariables {
  teamName: string;
}

const findPlayers = async (variables: FindPlayersVariables): Promise<FFType.PlayerWithTeam[]> => {
  const response = await graphQL.query<FindPlayersQlResult, FindPlayersVariables>(`
    query findingPlayers($teamName: String!) {
      getPlayers(teamName: $teamName){
        playerInfo {
          _id
          firstName
          lastName
          position
          specPositions
          team {
            name
            id
          }
        usedName
        }
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem fetching players');
  }
  console.log(response);
  return response.getPlayers;
};

export default findPlayers;
