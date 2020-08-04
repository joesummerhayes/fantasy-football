export interface AppState {
  user?: {
    userDetails?: FFType.User;
    loggedIn: boolean;
    isFetching: boolean;
  };
  error?: {
    message: string;
    status: number;
    specificError: string;
    errorLocation: string;
  };
}
