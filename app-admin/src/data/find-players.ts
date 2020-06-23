import graphQL from './graph-ql';

interface FindPlayersQlResult {
  playerIds: string[];
}

const findPlayers = async (variables: any): Promise<string[]> => {
  console.log('trying to get players on front end');
  const response = await graphQL.query<FindPlayersQlResult>(`
    query findingPlayers($teamName: String!) {
      getPlayers(teamName: $teamName){
        firstName
      }
    }
  `, variables);
  if (response === null) {
    throw new Error('There was a problem adding player');
  }
  console.log(response);
  return response.playerIds;
};

export default findPlayers;
