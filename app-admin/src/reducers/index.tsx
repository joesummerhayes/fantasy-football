import { combineReducers } from 'redux';
import userAuthReducer from './user-auth';
import { getErrorReducer } from './errors';

export default combineReducers({
  error: getErrorReducer,
  user: userAuthReducer,
});
