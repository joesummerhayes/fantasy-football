import { Action } from 'redux';
import { LOGIN_USER, CLEAR_ERROR, GET_ERROR, LOGOUT_USER } from './types';
import history from '../history';
import login from '../data/login';

export interface ClearError extends Action {
  payload: {};
}
type ClearErrorDispatch = (actions: ClearError) => void;

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
    history.push('/add-player');
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

export const logoutAction = () => (dispatch: any) => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  dispatch({
    type: LOGOUT_USER,
  });
};

export const clearErrors = () => (dispatch: ClearErrorDispatch): void => {
  dispatch({
    type: CLEAR_ERROR,
    payload: {},
  });
};

export default {};
