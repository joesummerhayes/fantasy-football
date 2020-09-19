import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import getPremTeams from '../data/get-prem-teams';

export interface GetPremTeamsAction {
  type: ActionTypes.getPremTeams;
  payload: FFType.PremTeam[];
}

export const getPremTeamsAction = () => async (dispatch: Dispatch): Promise<void> => {
  const premTeams = await getPremTeams();

  dispatch<GetPremTeamsAction>({
    type: ActionTypes.getPremTeams,
    payload: premTeams,
  });
};
