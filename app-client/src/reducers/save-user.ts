import { Reducer, AnyAction } from 'redux';
import { SAVE_USER, CREATE_USER } from '../actions/types';
import { SaveUser, CreateUser } from '../actions';
import { AppState } from '../app-state';

export const saveUserReducer: Reducer = (state = {}, action: AnyAction): AppState => {
  switch (action.type) {
    case SAVE_USER: {
      const { payload } = action as SaveUser;
      console.log('reducer returning', {
        ...state,
        ...payload,
      });
      return {
        ...state,
        ...payload,
      };
    }
    case CREATE_USER: {
      const { payload } = action as CreateUser;
      console.log('create user reducer working', payload);
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default {};
