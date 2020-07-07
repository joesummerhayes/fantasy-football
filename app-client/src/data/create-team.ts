import graphQL from './graph-ql';

interface TeamQLResult {
  createTeam: FFType.Team;
}

const createTeam = async (variables: any): Promise<FFType.Team> => {
  const response = await graphQL.query<TeamQLResult>(`
    mutation createNewTeam($clubMotto: String!, $kitColour: String!, $stadiumName: String!, $styleOfPlay: String!, $teamName: String!){
      createTeam(teamInput: {clubMotto: $clubMotto, kitColour: $kitColour, stadiumName: $stadiumName, styleOfPlay: $styleOfPlay, teamName: $teamName}) {
        _id
        info {
          clubMotto
          kitColour
          stadiumName
          styleOfPlay
          teamName
        }
      }
    }`,
  variables);
  if (response === null) {
    throw new Error('There was a problem creating user');
  }
  return response.createTeam;
};

export default createTeam;
