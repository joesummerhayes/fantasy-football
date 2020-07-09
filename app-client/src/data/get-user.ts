import graphQL from './graph-ql';

interface UserQLResult {
  user: FFType.User;
}

const getUser = async (): Promise<FFType.User> => {
  const response = await graphQL.query<UserQLResult>(`
    query {
      user {
        _id
        name
        email
        team {
          info {
            clubMotto
            kitColour
            stadiumName
            styleOfPlay
            teamName
          }
        }
      }
    }`);
  if (response === null) {
    throw new Error('could not get user details');
  }
  console.log(response.user);
  return response.user;
};

export default getUser;
