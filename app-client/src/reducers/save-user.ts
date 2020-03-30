import { Reducer, AnyAction } from 'redux';
import { SAVE_USER } from '../actions/types';
import { SaveUser } from '../actions';
import saveUser from '../data/save-user';

export const user: Reducer = async (state = {}, action: AnyAction): Promise<FFType.User> => {
  switch (action.type) {
    case SAVE_USER: {
      const { payload } = action as SaveUser;
      if (payload) await saveUser(payload);
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
