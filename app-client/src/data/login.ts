import graphQL from './graph-ql';

interface LoggedInUser {
  token: string;
  userId: string;
}

interface UserQLResult {
  login: LoggedInUser;
}

interface LoginVariables {
  email: string;
  password: string;
}

const login = async (variables: any): Promise<LoggedInUser> => {
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
