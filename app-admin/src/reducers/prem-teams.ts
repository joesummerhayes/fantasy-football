import { Reducer } from 'redux';
import { ActionTypes, Action } from '../actions/types';

interface PremTeamsState {
  name?: string;
  id?: string;
}

export const getPremTeamsReducer: Reducer = (state: PremTeamsState = {}, action: Action): PremTeamsState[] => {
  switch (action.type) {
    case ActionTypes.getPremTeams: {
      const { payload } = action;
      return [
        ...payload,
      ];
    }
    default:
      return [];
  }
};

export default {};
