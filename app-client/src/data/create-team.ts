import graphQL from './graph-ql';

interface TeamQLResult {
  createTeam: FFType.Team;
}

interface CreateTeamVariables {
  clubMotto: string;
  styleOfPlay: string;
  teamName: string;
  kitColour: string;
  stadiumName: string;
}

const createTeam = async (variables: CreateTeamVariables): Promise<FFType.Team> => {
  const response = await graphQL.query<TeamQLResult, CreateTeamVariables>(`
    mutation createNewTeam($clubMotto: String!, $kitColour: String!, $stadiumName: String!, $styleOfPlay: String!, $teamName: String!){
      createTeam(teamInput: {clubMotto: $clubMotto, kitColour: $kitColour, stadiumName: $stadiumName, styleOfPlay: $styleOfPlay, teamName: $teamName}) {
        _id
        userId
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
