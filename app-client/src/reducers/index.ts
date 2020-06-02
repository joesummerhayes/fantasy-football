import { combineReducers } from 'redux';
import { saveUserReducer } from './save-user';
import { getErrorReducer } from './errors';
import { redirectReducer } from './redirect';

export default combineReducers({
  data: saveUserReducer,
  error: getErrorReducer,
  redirectReducer,
});
