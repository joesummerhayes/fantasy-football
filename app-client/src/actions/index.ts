import { Action } from 'redux';
import {
  GET_PREM_TEAMS,
} from './types';

export interface GetPremTeams extends Action {
  payload: {};
}

type premTeamsDispatch = (actions: GetPremTeams) => void;

export const getPremTeams = () => async (dispatch: premTeamsDispatch): Promise<void> => {
  dispatch({
    type: GET_PREM_TEAMS,
    payload: {},
  });
};

export default getPremTeams;
