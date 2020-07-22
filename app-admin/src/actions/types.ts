import { LoginUserAction, LogoutUserAction } from './auth';
import { ClearErrorsAction, GetErrorAction } from './error';

export enum ActionTypes {
  loginUser,
  logoutUser,
  getError,
  clearErrors,
}

export type Action =
  ClearErrorsAction |
  GetErrorAction |
  LoginUserAction |
  LogoutUserAction;
