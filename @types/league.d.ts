import { User } from './user';

export interface League {
  _id: string;
  draftDate: Date;
  gameweekStart: string;
  leagueName: string;
  members: User[];
}
