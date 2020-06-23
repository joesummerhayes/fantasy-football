import graphQL from './graph-ql';

interface FindPlayersQlResult {
  playerIds: string[];
}

const findPlayers = async (variables: any): Promise<FFType.Player[]> => {
  console.log('trying to get players on front end');
  const response = await graphQL.query<FFType.Player[]>(`
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
  return response;
};

export default findPlayers;
