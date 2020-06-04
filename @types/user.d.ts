export interface User {
  name: string;
  email: string;
  password: string;
}

export interface LoggedInUser {
  token: string;
  userId: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
