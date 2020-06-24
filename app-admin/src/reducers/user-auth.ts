import { Reducer, AnyAction } from 'redux';
import { LOGIN_USER, LOGOUT_USER } from '../actions/types';
import { AppState } from '../app-state';

const userAuthReducer: Reducer = (state: AppState = {}, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default userAuthReducer;
