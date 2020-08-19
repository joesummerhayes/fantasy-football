import { User } from './user';
import { Team } from './team';
import { PlayerWithTeam, LeaguePlayer } from './player';
import {Types} from 'mongoose';

export interface League {
  _id: string;
  leagueInfo: {
    draftDate: Date;
    gameweekStart: string;
    leagueName: string;
    members: User[];
    passcode: string;
  };
  players: LeaguePlayer[];
}

export interface DraftLeague {
  league: League;
  data?: LeagueData;
  team?: Team;
}

export interface LeagueData {
  gameweekPoints: number;
  nextFixture: string;
  totalPoints: number;
  leaguePoints: number;
  prevFixture: string;
}
