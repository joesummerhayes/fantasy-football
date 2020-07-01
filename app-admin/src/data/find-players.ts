import graphQL from './graph-ql';

interface FindPlayersQlResult {
  getPlayers: FFType.PlayerWithTeam[];
}

const findPlayers = async (variables: any): Promise<FFType.PlayerWithTeam[]> => {
  const response = await graphQL.query<FindPlayersQlResult>(`
    query findingPlayers($teamName: String!) {
      getPlayers(teamName: $teamName){
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
  `, variables);
  if (response === null) {
    throw new Error('There was a problem fetching players');
  }
  console.log(response);
  return response.getPlayers;
};

export default findPlayers;
