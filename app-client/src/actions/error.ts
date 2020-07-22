import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface ClearErrorsAction {
  type: ActionTypes.clearError;
  payload: {};
}

interface Error {
  errorLocation: string;
  message: string;
  specificError: string;
  status: number;
}

export interface GetErrorAction {
  type: ActionTypes.getError;
  payload: Error;
}

export const clearErrors = () => (dispatch: Dispatch): void => {
  dispatch<ClearErrorsAction>({
    type: ActionTypes.clearError,
    payload: {},
  });
};

export const getErrorAction = (error: Error) => (dispatch: Dispatch): void => {
  dispatch<GetErrorAction>({
    type: ActionTypes.getError,
    payload: error,
  });
};
