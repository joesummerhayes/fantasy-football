import { User } from './user';

export interface League {
  _id: string;
  leagueInfo: {
    draftDate: Date;
    gameweekStart: string;
    leagueName: string;
    members: User[];
    passcode: string;
  };
}
