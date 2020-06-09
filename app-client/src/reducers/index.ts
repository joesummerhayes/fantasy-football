import { combineReducers } from 'redux';
import { getErrorReducer } from './errors';
import userAuthReducer from './user-auth';

export default combineReducers({
  error: getErrorReducer,
  user: userAuthReducer,
});
