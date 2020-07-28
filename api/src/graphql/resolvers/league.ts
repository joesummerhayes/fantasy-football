import mongoose from 'mongoose';
import User from '../../models/user';
import League from '../../models/league';
import { checkFieldsExist } from './utils';

interface RequestWithUser extends Request {
  userId: string;
  isAuth: boolean;
}

interface CreateLeagueArgs {
  leagueInput: {
    draftDate: Date;
    gameweekStart: string;
    leagueName: string;
  }
}

export default {
  async createLeague(args: CreateLeagueArgs, req: RequestWithUser): Promise<FFType.League> {
    const { leagueInput } = args;
    const { userId, isAuth } = req;
    if (!isAuth) {
      throw new Error('User not authenticated');
    }
    const { draftDate, gameweekStart, leagueName } = leagueInput;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const fieldInputs = Object.values(leagueInput);
    const fieldInputsToString = fieldInputs.map((field) => field.toString());
    if (!checkFieldsExist(fieldInputsToString)) {
      throw new Error('Some fields for creating a team were empty');
    }

    const userObjId = mongoose.Types.ObjectId(userId);

    const league = new League({
      draftDate,
      gameweekStart,
      leagueName,
      members: [userObjId],
    });
    const savedLeague = await league.save();
    return savedLeague;
  },
};
