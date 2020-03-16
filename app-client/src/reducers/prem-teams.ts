import { Reducer, AnyAction } from 'redux';
import { GET_PREM_TEAMS } from '../actions/types';
import { GetPremTeams } from '../actions';

export const premTeamsReducer: Reducer = (state = {}, action: AnyAction): FFType.PremTeam[] => {
  switch (action.type) {
    case GET_PREM_TEAMS: {
      const { payload } = action as GetPremTeams;
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default {};
