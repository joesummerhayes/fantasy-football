import graphQL from './graph-ql';

interface UserQLResult {
  login: FFType.LoggedInUser;
}

interface LoginVariables {
  email: string;
  password: string;
}

const login = async (variables: LoginVariables): Promise<FFType.LoggedInUser> => {
  const response = await graphQL.query<UserQLResult, LoginVariables>(`
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
