import { PremTeam as IPremTeam } from './prem-team';
import { User as IUser, LoggedInUser as ILoggedInUser, LoginCredentials as ILoginCredentials, SignupUser as ISignupUser } from './user';
import { MongoUser as IMongoUser } from './mongo-user';
import { Validator as IValidator, FormItem as IFormItem } from './form';
import { Player as IPlayer, PlayerWithTeam as IPlayerWithTeam } from './player';
import { Team as ITeam } from './team';

declare namespace FFType {
  export type FormItem = IFormItem;
  export type MongoUser = IMongoUser;
  export type LoginCredentials = ILoginCredentials;
  export type LoggedInUser = ILoggedInUser;
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
