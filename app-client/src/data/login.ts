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
  console.log('2222');
  if (response === null) {
    throw new Error('There was a problem loggin in user');
  }
  console.log('3333', response);
  return response.login;
};

export default login;
