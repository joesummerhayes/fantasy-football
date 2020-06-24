import graphQL from './graph-ql';

interface FindPlayersQlResult {
  getPlayers: FFType.Player[];
}

const findPlayers = async (variables: any): Promise<FFType.Player[]> => {
  const response = await graphQL.query<FindPlayersQlResult>(`
    query findingPlayers($teamName: String!) {
      getPlayers(teamName: $teamName){
        firstName
        lastName
        position
        team
        _id
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem adding player');
  }
  return response.getPlayers;
};

export default findPlayers;
