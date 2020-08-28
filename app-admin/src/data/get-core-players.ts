import graphQL from './graph-ql';

interface GetCorePlayersQlResult {
  getCorePlayers: FFType.PlayerWithTeam[];
}

const getCorePlayers = async (variables: any): Promise<FFType.PlayerWithTeam[]> => {
  const response = await graphQL.query<GetCorePlayersQlResult>(`
    query getCorePlayers($teamName: String!) {
      getCorePlayers(teamName: $teamName){
        _id
        firstName
        lastName
        position
        specPositions
        team {
          teamId
          name
        }
        usedName
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem fetching players');
  }
  console.log(response);
  return response.getCorePlayers;
};

export default getCorePlayers;
