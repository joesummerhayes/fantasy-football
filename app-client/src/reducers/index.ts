import { combineReducers } from 'redux';
import { premTeamsReducer } from './prem-teams';
import { saveUserReducer } from './save-user';

export default combineReducers({
  premTeamsReducer,
  user: saveUserReducer,
});
