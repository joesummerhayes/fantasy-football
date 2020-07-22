import { ActionTypes, Action } from '../actions/types';

interface UserState {
  userDetails?: FFType.User;
  loggedIn: boolean;
}

const userAuthReducer = (state: UserState = { loggedIn: false }, action: Action): UserState => {
  switch (action.type) {
    case ActionTypes.loginUser: {
      const { payload } = action;
      return {
        ...state,
        userDetails: payload,
        loggedIn: true,
      };
    }
    case ActionTypes.logoutUser: {
      return {
        ...state,
        userDetails: {
          _id: '',
          name: '',
        },
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default userAuthReducer;
