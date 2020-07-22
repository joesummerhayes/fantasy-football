import { ActionTypes, Action } from '../actions/types';

interface UserState {
  user?: FFType.LoggedInUser;
  loggedIn: boolean;
}

const userAuthReducer = (state: UserState = { loggedIn: false }, action: Action): UserState => {
  switch (action.type) {
    case ActionTypes.loginUser: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case ActionTypes.logoutUser: {
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
