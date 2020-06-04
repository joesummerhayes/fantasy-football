import graphQL from './graph-ql';
import {compose} from 'redux';

interface User {
  name: string;
}

interface UserQLResult {
  user: User;
}

const getUser = async (): Promise<User> => {
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
  console.log(response.user);
  return response.user;
};

export default getUser;
