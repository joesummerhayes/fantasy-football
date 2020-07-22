import { ClearErrorsAction, GetErrorAction } from './error';
import { ClearErrorAction } from './user';
import { LoginUserAction, LogoutUserAction } from './auth';

export enum ActionTypes {
  createUser,
  getError,
  loginUser,
  logoutUser,
  clearError,
}

export type Action =
  ClearErrorAction |
  ClearErrorsAction |
  GetErrorAction |
  LoginUserAction |
  LogoutUserAction;
