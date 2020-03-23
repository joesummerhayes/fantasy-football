import { Reducer, AnyAction } from 'redux';
import { SAVE_USER } from '../actions/types';
import { SaveUser } from '../actions';

export const user: Reducer = (state = {}, action: AnyAction): FFType.User => {
  switch (action.type) {
    case SAVE_USER: {
      const { payload } = action as SaveUser;
      console.log('payload in reducer', payload)
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
