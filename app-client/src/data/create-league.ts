import graphQL from './graph-ql';

interface LeagueQLResult {
  createTeam: FFType.League;
}

interface CreateLeagueVariables {
  draftDate: Date;
  gameweekStart: string;
  leagueName: string;
}

const leagueTeam = async (variables: CreateLeagueVariables): Promise<FFType.League> => {
  const response = await graphQL.query<LeagueQLResult, CreateLeagueVariables>(`
    mutation createNewLeague($draftDate: DateTime!, $gameweekStart: String!, $leagueName: String!){
      createLeague(leagueInput: {draftDate: $draftDate, gameweekStart: $gameweekStart, leagueName: $leagueName}) {
        _id
        leagueInfo {
          draftDate
        gameweekStart
        leagueName
        members {
          _id
          email
        }
        }
      }
    }`,
  variables);
  if (response === null) {
    throw new Error('There was a problem creating user');
  }
  console.log(response);
  return response.createTeam;
};

export default leagueTeam;
