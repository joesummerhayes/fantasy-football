import { Reducer, AnyAction } from 'redux';
import { LOGIN_USER } from '../actions/types';
import { LoginUser } from '../actions';
import { AppState } from '../app-state';

export const loginUserReducer: Reducer = (state = {}, action: AnyAction): AppState => {
  switch (action.type) {
    case LOGIN_USER: {
      console.log('4444');
      const { payload } = action as LoginUser;
      return {
        ...state,
        loggedIn: true,
        user: payload,
      };
    }
    default:
      return state;
  }
};

export default {};
