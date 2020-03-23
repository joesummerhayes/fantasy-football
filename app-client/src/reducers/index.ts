import { combineReducers } from 'redux';
import { premTeamsReducer } from './prem-teams';
import { user } from './save-user';

export default combineReducers({
  premTeamsReducer,
  user,
});
