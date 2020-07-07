import mongoose from 'mongoose';
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

interface RequestWithUser extends Request {
  userId: string;
}

export default {
  async createTeam(args: CreateTeamArgs, req: RequestWithUser): Promise<FFType.Team> {
    const userId = req?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const userObjId = mongoose.Types.ObjectId(userId);
    const { teamInput } = args;
    const team = new Team({
      info: { ...teamInput },
      userId: userObjId,
    });
    const createdTeam = await team.save();
    console.log(createdTeam);
    return createdTeam;
  },
};
