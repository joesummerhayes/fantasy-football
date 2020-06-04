import { combineReducers } from 'redux';
import { saveUserReducer } from './save-user';
import { getErrorReducer } from './errors';
import { loginUserReducer } from './login-user';

export default combineReducers({
  data: saveUserReducer,
  error: getErrorReducer,
  user: loginUserReducer,
});
