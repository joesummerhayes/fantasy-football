import { DraftLeague } from './league';

export interface User {
  _id: string;
  email?: string;
  draftLeague?: DraftLeague;
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
