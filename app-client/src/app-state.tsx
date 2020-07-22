export interface AppState {
  user?: {
    userDetails?: FFType.User;
    loggedIn: boolean;
  };
  error?: {
    message: string;
    status: number;
    specificError: string;
    errorLocation: string;
  };
}
