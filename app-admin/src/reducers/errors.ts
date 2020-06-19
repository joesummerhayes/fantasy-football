import { Reducer, AnyAction, Action } from 'redux';
import { GET_ERROR, CLEAR_ERROR } from '../actions/types';
import { AppState } from '../app-state';

interface GetErrors extends Action {
  payload: {};
}

export const getErrorReducer: Reducer = (state: AppState = {}, action: AnyAction): any => {
  switch (action.type) {
    case GET_ERROR: {
      const { payload } = action as GetErrors;
      return {
        ...state,
        ...payload,
      };
    }
    case CLEAR_ERROR: {
      return {};
    }
    default:
      return state;
  }
};

export default {};
