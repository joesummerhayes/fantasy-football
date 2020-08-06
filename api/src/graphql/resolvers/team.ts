import mongoose from 'mongoose';
import Team from '../../models/team';
import User from '../../models/user';
import { checkFieldsExist } from './utils';

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
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }

    const { teamInput } = args;
    const values = Object.values(teamInput);
    if (!checkFieldsExist(values)) {
      throw new Error('Some fields for creating a team were empty');
    }

    const userObjId = mongoose.Types.ObjectId(userId);

    const team = new Team({
      info: { ...teamInput },
      userId: userObjId,
    });
    const createdTeam = await team.save();

    // create reference to team on user
    const teamId = createdTeam._id;
    user.draftLeague.team = teamId;
    await user.save();


    return createdTeam;
  },
};
