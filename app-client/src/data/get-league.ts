import graphQL from './graph-ql';

interface UserQLResult {
  getLeague: FFType.League;
}

const getLeague = async (): Promise<FFType.League> => {
  const response = await graphQL.query<UserQLResult>(`
  query {
    getLeague {
      _id
      draftDate
      gameweekStart
      leagueName
      members {
        _id
        name
        email     
      }
    }
  }`);
  if (response === null) {
    throw new Error('could not find a league');
  }
  console.log('!!!!!', response);
  return response.getLeague;
};

export default getLeague;
