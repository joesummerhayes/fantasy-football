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
          _id
          name
        }
        usedName
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem fetching players');
  }
  console.log('get core players response', response.getCorePlayers);
  return response.getCorePlayers;
};

export default getCorePlayers;
