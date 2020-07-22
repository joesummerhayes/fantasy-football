import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface ClearErrorsAction {
  type: ActionTypes.clearErrors;
  payload: {};
}

export interface GetErrorAction {
  type: ActionTypes.getError;
  payload: Error;
}

interface Error {
  errorLocation: string;
  message: string;
  specificError: string;
  status: number;
}

export const clearErrors = () => (dispatch: Dispatch): void => {
  dispatch<ClearErrorsAction>({
    type: ActionTypes.clearErrors,
    payload: {},
  });
};

export const getErrorAction = (error: Error) => (dispatch: Dispatch): void => {
  dispatch<GetErrorAction>({
    type: ActionTypes.getError,
    payload: error,
  });
};
