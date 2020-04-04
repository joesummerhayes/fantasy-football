import { Reducer, AnyAction } from 'redux';
import { SAVE_USER } from '../actions/types';
import { SaveUser } from '../actions';
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
    default:
      return state;
  }
};

export default {};
