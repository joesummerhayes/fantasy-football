import { Reducer, AnyAction, Action } from 'redux';
import { REDIRECT } from '../actions/types';

interface Redirect extends Action {
  payload: string;
}

export const redirectReducer: Reducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case REDIRECT: {
      const { payload } = action as Redirect;
      return {
        ...state,
        payload,
      };
    }
    default:
      return state;
  }
};

export default {};
