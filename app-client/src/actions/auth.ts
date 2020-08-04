import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import login from '../data/login';
import getUser from '../data/get-user';
import history from '../history';

export interface LogoutUserAction {
  type: ActionTypes.logoutUser;
}

export interface LoginUserAction {
  type: ActionTypes.loginUser;
  payload: FFType.User;
}

export interface FetchingDataAction {
  type: ActionTypes.fetchingData;
}

export const loginAction = (loginInputData: FFType.LoginCredentials) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const loggedInUser = await login(loginInputData);
    if (!loggedInUser) {
      throw new Error('no user found with these credentials');
    }

    localStorage.setItem('token', loggedInUser.token);
    localStorage.setItem('userId', loggedInUser.userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds,
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    const user = await getUser();
    history.push('/');
    dispatch({
      type: ActionTypes.clearError,
    });
    dispatch<LoginUserAction>({
      type: ActionTypes.loginUser,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.getError,
      payload: err,
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
