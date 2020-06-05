import { PremTeam as IPremTeam } from './prem-team';
import { User as IUser, LoggedInUser as ILoggedInUser, LoginCredentials as ILoginCredentials, SignupUser as ISignupUser } from './user';
import { MongoUser as IMongoUser } from './mongo-user';

declare namespace FFType {
  export type PremTeam = IPremTeam;
  export type User = IUser;
  export type MongoUser = IMongoUser;
  export type LoggedInUser = ILoggedInUser;
  export type LoginCredentials = ILoginCredentials;
  export type SignupUser = ISignupUser;
}

export = FFType;
export as namespace FFType;
