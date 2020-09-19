import { LoginUserAction, LogoutUserAction } from './auth';
import { ClearErrorsAction, GetErrorAction } from './error';
import { GetPremTeamsAction } from './premTeams';

export enum ActionTypes {
  loginUser,
  logoutUser,
  getError,
  clearErrors,
  getPremTeams,
}

export type Action =
  ClearErrorsAction |
  GetErrorAction |
  LoginUserAction |
  LogoutUserAction |
  GetPremTeamsAction;
