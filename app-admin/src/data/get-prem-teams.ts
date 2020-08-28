import graphQL from './graph-ql';

interface GetPremTeamsQlResult {
  getPremTeams: FFType.PremTeam[];
}

const getPremTeams = async (): Promise<FFType.PremTeam[]> => {
  const response = await graphQL.query<GetPremTeamsQlResult>(`
    query {
      getPremTeams {
        teamId
        name
      }
    }
  `);
  if (response === null) {
    throw new Error('There was a problem fetching players');
  }
  console.log(response);
  return response.getPremTeams;
};

export default getPremTeams;
