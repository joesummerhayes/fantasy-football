import { combineReducers } from 'redux';
import { saveUserReducer } from './save-user';
import { getErrorReducer } from './errors';

export default combineReducers({
  data: saveUserReducer,
  error: getErrorReducer,
});
