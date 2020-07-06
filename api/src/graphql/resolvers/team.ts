import Team from '../../models/team';

interface CreateTeamArgs {
  teamInput: {
    clubMotto: string;
    kitColour: string;
    stadiumName: string;
    styleOfPlay: string;
    teamName: string;
  };
}

export default {
  async createTeam(args: CreateTeamArgs, req: Request): Promise<FFType.Team> {
    const { teamInput } = args;
    // const { clubMotto, kitColour, stadiumName, styleOfPlay, teamName } = teamInput;
    const team = new Team(teamInput);
    console.log('!!!', team);
    const createdTeam = await team.save();
    console.log(createdTeam);
    return createdTeam;
  },
};
