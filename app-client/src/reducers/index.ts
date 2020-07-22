import { combineReducers } from 'redux';
import { getErrorReducer } from './errors';
import userAuthReducer from './user-auth';
import { AppState } from '../app-state';

export default combineReducers<AppState>({
  error: getErrorReducer,
  user: userAuthReducer,
});
