import graphQL from './graph-ql';

interface LeagueQLResult {
  joinLeague: boolean;
}

interface JoinLeagueVariables {
  passcode: string;
}

const joinLeague = async (variables: JoinLeagueVariables): Promise<boolean> => {
  const response = await graphQL.query<LeagueQLResult, JoinLeagueVariables>(`
    mutation joinLeague($passcode: String!){
      joinLeague(passcode: $passcode)
    }`,
  variables);
  if (response === null) {
    throw new Error('There was a problem joining the league');
  }
  return response.joinLeague;
};

export default joinLeague;
