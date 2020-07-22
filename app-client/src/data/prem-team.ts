import graphQL from './graph-ql';

type PremTeam = FFType.PremTeam;

interface PremTeamDataQLResult {
  premTeam: PremTeam;
}

const getPremTeam = async (teamId: string): Promise<PremTeam> => {
  const response = await graphQL.query<PremTeamDataQLResult>(`
  query {
    premTeam(id: "${teamId}") {
      _id
      name
      cleanName
      image
    }
  }`);
  return response.premTeam;
};

export default getPremTeam;
