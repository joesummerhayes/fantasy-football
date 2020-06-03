import { Reducer, AnyAction } from 'redux';
import { CREATE_USER } from '../actions/types';
import { CreateUser } from '../actions';
import { AppState } from '../app-state';

export const saveUserReducer: Reducer = (state = {}, action: AnyAction): AppState => {
  switch (action.type) {
    case CREATE_USER: {
      const { payload } = action as CreateUser;
      console.log('create user reducer working', payload);
      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
};

export default {};
