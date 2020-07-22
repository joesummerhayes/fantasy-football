import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import history from '../history';
import createUser from '../data/create-user';
import getUser from '../data/get-user';
import { LoginUserAction } from './auth';
import { GetErrorAction } from './error';

export interface ClearErrorAction {
  type: ActionTypes.clearError;
}

export const createUserAction = (userInputData: FFType.SignupUser) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const savedUser = await createUser(userInputData);
    if (!savedUser) {
      throw new Error('Could not create new user');
    }
    history.push('/login');
    dispatch<ClearErrorAction>({
      type: ActionTypes.clearError,
    });
  } catch (err) {
    dispatch<GetErrorAction>({
      type: ActionTypes.getError,
      payload: err,
    });
    return err;
  }
};

export const getUserAction = () => async (dispatch: Dispatch): Promise<void> => {
  const user = await getUser();
  dispatch<LoginUserAction>({
    type: ActionTypes.loginUser,
    payload: user,
  });
};
