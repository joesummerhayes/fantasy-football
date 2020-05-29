import { Action } from 'redux';
import createUser from '../data/create-user';
import {
  GET_PREM_TEAMS,
  CREATE_USER,
} from './types';

export interface GetPremTeams extends Action {
  payload: {};
}

export interface SaveUser extends Action {
  payload: FFType.User;
}

export interface CreateUser extends Action {
  payload: FFType.User;
}

type premTeamsDispatch = (actions: GetPremTeams) => void;
type SaveUserDispatch = (actions: SaveUser) => void;
type CreateUserDispatch = (actions: CreateUser) => void;

export const getPremTeams = () => async (dispatch: premTeamsDispatch): Promise<void> => {
  dispatch({
    type: GET_PREM_TEAMS,
    payload: {},
  });
};

export const createUserAction = (userInputData: FFType.User) => async (dispatch: CreateUserDispatch): Promise<void> => {
  try {
    const savedUser = await createUser(userInputData);
    if (!savedUser) {
      throw new Error('Could not create new user');
    }
    dispatch({
      type: CREATE_USER,
      payload: savedUser,
    });
  } catch (err) {
    console.log(err);
  }
};

export default {};
