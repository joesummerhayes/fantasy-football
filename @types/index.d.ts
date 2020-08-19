import { PremTeam as IPremTeam } from './prem-team';
import { User as IUser, LoggedInUser as ILoggedInUser, LoginCredentials as ILoginCredentials, SignupUser as ISignupUser } from './user';
import { MongoUser as IMongoUser } from './mongo-user';
import { Validator as IValidator, FormItem as IFormItem } from './form';
import { Player as IPlayer, PlayerWithTeam as IPlayerWithTeam, LeaguePlayer as ILeaguePlayer } from './player';
import { Team as ITeam } from './team';
import { League as ILeague, LeagueData as ILeagueData, DraftLeague as IDraftLeague } from './league';

declare namespace FFType {
  export type DraftLeague = IDraftLeague;
  export type FormItem = IFormItem;
  export type League = ILeague;
  export type LeagueData = ILeagueData;
  export type LeaguePlayer = ILeaguePlayer;
  export type LoginCredentials = ILoginCredentials;
  export type LoggedInUser = ILoggedInUser;
  export type MongoUser = IMongoUser;
  export type Player = IPlayer;
  export type PlayerWithTeam = IPlayerWithTeam;
  export type PremTeam = IPremTeam;
  export type SignupUser = ISignupUser;
  export type Team = ITeam;
  export type User = IUser;
  export type Validator = IValidator;
}

export = FFType;
export as namespace FFType;
