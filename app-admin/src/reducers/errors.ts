import { ActionTypes, Action } from '../actions/types';

interface ErrorState {
  message?: string;
  status?: number;
  specificError?: string;
  errorLocation?: string;
}

export const getErrorReducer = (state: ErrorState = {}, action: Action): ErrorState => {
  switch (action.type) {
    case ActionTypes.getError: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    case ActionTypes.clearErrors: {
      return {};
    }
    default:
      return state;
  }
};

export default {};
