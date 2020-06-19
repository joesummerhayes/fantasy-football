import graphQL from './graph-ql';

interface UserQLResult {
  login: FFType.LoggedInUser;
}

const login = async (variables: any): Promise<FFType.LoggedInUser> => {
  const response = await graphQL.query<UserQLResult>(`
    query loggingInuser($email: String!, $password: String!){
      login(email: $email, password: $password) {
        token
        userId
      }
    }`,
  variables);
  if (response === null) {
    throw new Error('There was a problem loggin in user');
  }
  return response.login;
};

export default login;
