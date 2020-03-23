import { Action } from 'redux';
import {
  GET_PREM_TEAMS,
  SAVE_USER,
} from './types';

export interface GetPremTeams extends Action {
  payload: {};
}

export interface SaveUser extends Action {
  payload: FFType.User;
}

type premTeamsDispatch = (actions: GetPremTeams) => void;
type SaveUserDispatch = (actions: SaveUser) => void;

export const getPremTeams = () => async (dispatch: premTeamsDispatch): Promise<void> => {
  dispatch({
    type: GET_PREM_TEAMS,
    payload: {},
  });
};

export const saveUser = (user: FFType.User) => async (dispatch: SaveUserDispatch): Promise<void> => {
  dispatch({
    type: SAVE_USER,
    payload: user,
  });
};

export default {};
