import { Reducer } from 'redux';
import { ActionTypes, Action } from '../actions/types';

interface PremTeam {
  name?: string;
  id?: string;
}

type PremTeamState = PremTeam[];

export const getPremTeamsReducer: Reducer = (state: PremTeamState = [], action: Action): PremTeamState => {
  switch (action.type) {
    case ActionTypes.getPremTeams: {
      const { payload } = action;
      return [
        ...payload,
      ];
    }
    default:
      return state;
  }
};

export default {};
