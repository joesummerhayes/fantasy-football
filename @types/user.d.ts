import { Team } from './team';
import { League } from './league';

export interface User {
  _id: string;
  email?: string;
  league?: League;
  team?: Team;
  name: string;
}

export interface LoggedInUser {
  token: string;
  userId: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupUser {
  name: string;
  email: string;
  password: string;
}
