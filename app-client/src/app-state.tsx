export interface AppState {
  user?: {
    user?: FFType.LoggedInUser;
    loggedIn: boolean;
  };
  error?: {
    message: string;
    status: number;
    specificError: string;
    errorLocation: string;
  };
}

