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
      }
    }`);
  if (response === null) {
    throw new Error('could not get user details');
  }
  return response.user;
};

export default getUser;
