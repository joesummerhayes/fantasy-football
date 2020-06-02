import { Reducer, AnyAction, Action } from 'redux';
import { GET_ERROR } from '../actions/types';

interface GetErrors extends Action {
  payload: {};
}

export const getErrorReducer: Reducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case GET_ERROR: {
      const { payload } = action as GetErrors;
      return {
        ...state,
        message: payload,
      };
    }
    default:
      return state;
  }
};

export default {};
