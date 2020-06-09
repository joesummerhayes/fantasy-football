import { Action } from 'redux';
import createUser from '../data/create-user';
import login from '../data/login';
import {
  GET_PREM_TEAMS,
  CLEAR_ERROR,
  GET_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
} from './types';
import history from '../history';

export interface SaveUser extends Action {
  payload: FFType.User;
}

export interface CreateUser extends Action {
  payload: FFType.User;
}

export interface LoginUser extends Action {
  payload: FFType.LoggedInUser;
}

export interface ClearError extends Action {
  payload: {};
}

type LoginDispatch = (actions: LoginUser) => void;
type ClearErrorDispatch = (actions: ClearError) => void;

export const createUserAction = (userInputData: FFType.SignupUser) => async (dispatch: any): Promise<void> => {
  try {
    const savedUser = await createUser(userInputData);
    if (!savedUser) {
      throw new Error('Could not create new user');
    }
    history.push('/login');
    dispatch({
      type: CLEAR_ERROR,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: err,
    });
    return err;
  }
};

export const loginAction = (loginInputData: FFType.LoginCredentials) => async (dispatch: any): Promise<void> => {
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
      type: CLEAR_ERROR,
    });
    dispatch({
      type: LOGIN_USER,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: err,
    });
    return err;
  }
};

export const clearErrors = () => (dispatch: ClearErrorDispatch): void => {
  dispatch({
    type: CLEAR_ERROR,
    payload: {},
  });
};

export const logoutAction = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT_USER,
  });
};

export default {};
