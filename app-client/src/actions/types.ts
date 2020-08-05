import { ClearErrorsAction, GetErrorAction } from './error';
import { ClearErrorAction } from './user';
import { LoginUserAction, LogoutUserAction, FetchingDataAction } from './auth';

export enum ActionTypes {
  createUser,
  getError,
  loginUser,
  logoutUser,
  clearError,
  fetchingData,
}

export type Action =
  ClearErrorAction |
  ClearErrorsAction |
  GetErrorAction |
  LoginUserAction |
  LogoutUserAction |
  FetchingDataAction;
