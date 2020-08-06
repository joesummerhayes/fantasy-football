export interface AppState {
  user?: {
    isFetching: boolean;
    loggedIn: boolean;
    userDetails?: FFType.User;
  };
  error?: {
    message: string;
    status: number;
    specificError: string;
    errorLocation: string;
  };
}
