import { PremTeam as IPremTeam } from './prem-team';
import { User as IUser, LoggedInUser as ILoggedInUser, LoginCredentials as ILoginCredentials } from './user';
import { MongoUser as IMongoUser } from './mongo-user';
// import { AppState as IAppState } from './app-state';

declare namespace FFType {
  // export type AppState = IAppState;
  export type PremTeam = IPremTeam;
  export type User = IUser;
  export type MongoUser = IMongoUser;
  export type LoggedInUser = ILoggedInUser;
  export type LoginCredentials = ILoginCredentials;
}

export = FFType;
export as namespace FFType;
