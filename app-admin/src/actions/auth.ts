
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import history from '../history';
import login from '../data/login';
import { ClearErrorsAction, GetErrorAction } from './error';

export interface LoginUserAction {
  type: ActionTypes.loginUser;
  payload: FFType.LoggedInUser;
}

export interface LogoutUserAction {
  type: ActionTypes.logoutUser;
}

export const loginAction = (loginInputData: FFType.LoginCredentials) => async (dispatch: Dispatch): Promise<void> => {
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
    dispatch<ClearErrorsAction>({
      type: ActionTypes.clearErrors,
      payload: {},
    });
    dispatch<LoginUserAction>({
      type: ActionTypes.loginUser,
      payload: user,
    });
  } catch (err) {
    dispatch<GetErrorAction>({
      type: ActionTypes.getError,
      payload: err.specificError,
    });
    return err;
  }
};

export const logoutAction = () => (dispatch: Dispatch): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  dispatch<LogoutUserAction>({
    type: ActionTypes.logoutUser,
  });
};
