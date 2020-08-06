import mongoose from 'mongoose';
import User from '../../models/user';
import League from '../../models/league';
import { checkFieldsExist, generatePassword } from './utils';

interface RequestWithUser extends Request {
  userId: string;
  isAuth: boolean;
}

interface CreateLeagueArgs {
  leagueInput: {
    draftDate: Date;
    gameweekStart: string;
    leagueName: string;
  };
}

interface JoinLeagueArgs {
  passcode: string;
}

export default {
  async createLeague(args: CreateLeagueArgs, req: RequestWithUser): Promise<FFType.League> {
    const { leagueInput } = args;
    console.log('leagueInput', leagueInput);
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

    const passcode = await generatePassword(10);

    const league = new League({
      leagueInfo: {
        draftDate,
        gameweekStart,
        leagueName,
        members: [userObjId],
        passcode,
      },
    });
    const savedLeague = await league.save();

    const { _id } = savedLeague;

    user.league = _id;
    await user.save();

    const leagueWithMembers = await League.findById(_id).populate('members');
    if (!leagueWithMembers) throw new Error('failed to create league with members');
    return leagueWithMembers;
  },

  async joinLeague(args: JoinLeagueArgs, req: RequestWithUser): Promise<boolean> {
    const { userId, isAuth } = req;
    if (!isAuth) {
      throw new Error('User not authenticated');
    }
    const { passcode } = args;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('no user found');
    }

    if (user.league) {
      console.log('user is already a member of a league');
      return false;
    }

    const leagueToJoin = await League.findOne({ 'leagueInfo.passcode': passcode });
    if (!leagueToJoin) {
      return false;
    }

    leagueToJoin?.leagueInfo?.members.push(userId);
    const newLeague = await leagueToJoin?.save();
    console.log(newLeague);

    user.league = newLeague._id;
    await user.save();
    return true;
  },

  async getLeague(args: any, req: RequestWithUser): Promise<FFType.League> {
    const { userId, isAuth } = req;
    if (!isAuth) {
      throw new Error('User not authenticated');
    }
    const user = await User.findById(userId).populate('league');
    if (!user) {
      throw new Error('Could not find user');
    }
    const { league } = user;
    if (!league) {
      throw new Error('User has not joined a league yet');
    }
    const { _id } = league;
    const leagueWithMembersDetails = await League.findById(_id).populate('leagueInfo.members');
    if (!leagueWithMembersDetails) {
      throw new Error('failed to get league with valid members');
    }
    console.log(leagueWithMembersDetails);
    return leagueWithMembersDetails;
  },
};
