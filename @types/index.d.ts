import { PremTeam as IPremTeam } from './prem-team';
import { User as IUser } from './user';
import { AppState as IAppState } from './app-state';

declare namespace FFType {
  export type AppState = IAppState;
  export type PremTeam = IPremTeam;
  export type User = IUser;
}

export = FFType;
export as namespace FFType;
