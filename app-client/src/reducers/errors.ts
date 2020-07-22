import { Reducer } from 'redux';
import { ActionTypes, Action } from '../actions/types';

interface ErrorState {
  message?: string;
  status?: number;
  specificError?: string;
  errorLocation?: string;
}

export const getErrorReducer: Reducer = (state: ErrorState = {}, action: Action): ErrorState => {
  switch (action.type) {
    case ActionTypes.getError: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    case ActionTypes.clearError: {
      return {};
    }
    default:
      return state;
  }
};

export default {};
