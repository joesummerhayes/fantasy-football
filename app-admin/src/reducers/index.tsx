import { combineReducers } from 'redux';
import userAuthReducer from './user-auth';
import { getErrorReducer } from './errors';
import { AppState } from '../app-state';

export default combineReducers<AppState>({
  error: getErrorReducer,
  user: userAuthReducer,
});
