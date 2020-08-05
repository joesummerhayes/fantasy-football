import { ActionTypes, Action } from '../actions/types';

interface UserState {
  userDetails?: FFType.User;
  loggedIn: boolean;
  isFetching: boolean;
}

const userAuthReducer = (state: UserState = { loggedIn: false, isFetching: false }, action: Action): UserState => {
  switch (action.type) {
    case ActionTypes.fetchingData: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ActionTypes.loginUser: {
      const { payload } = action;
      return {
        ...state,
        userDetails: payload,
        loggedIn: true,
        isFetching: false,
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
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default userAuthReducer;
