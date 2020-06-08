import { Action } from 'redux';
import createUser from '../data/create-user';
import login from '../data/login';
import {
  GET_PREM_TEAMS,
  CREATE_USER,
  GET_ERROR,
  LOGIN_USER,
} from './types';
import history from '../history';

export interface GetPremTeams extends Action {
  payload: {};
}

export interface SaveUser extends Action {
  payload: FFType.User;
}

export interface CreateUser extends Action {
  payload: FFType.User;
}

export interface LoginUser extends Action {
  payload: FFType.LoggedInUser;
}

type premTeamsDispatch = (actions: GetPremTeams) => void;
type CreateUserDispatch = (actions: CreateUser) => void;
type LoginDispatch = (actions: LoginUser) => void;

export const getPremTeams = () => async (dispatch: premTeamsDispatch): Promise<void> => {
  dispatch({
    type: GET_PREM_TEAMS,
    payload: {},
  });
};

export const createUserAction = (userInputData: FFType.SignupUser) => async (dispatch: CreateUserDispatch): Promise<void> => {
  try {
    const savedUser = await createUser(userInputData);
    if (!savedUser) {
      throw new Error('Could not create new user');
    }
    history.push('/login');
    dispatch({
      type: CREATE_USER,
      payload: savedUser,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERROR,
      payload: err.specificError,
    });
    return err;
  }
};

export const loginAction = (loginInputData: FFType.LoginCredentials) => async (dispatch: LoginDispatch): Promise<void> => {
  try {
    const user = await login(loginInputData);
    if (!user) {
      throw new Error('no user found with these credentials');
    }
    localStorage.setItem('token', user.token);
    localStorage.setItem('userId', user.userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds,
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    history.push('/');
    dispatch({
      type: LOGIN_USER,
      payload: user,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERROR,
      payload: err.toString(),
    });
    return err;
  }
};

export default {};
