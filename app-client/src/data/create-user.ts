import graphQL from './graph-ql';

interface UserQLResult {
  createUser: FFType.User;
}

interface CreateUserVariables {
  email: string;
  name: string;
  password: string;
}

const createUser = async (variables: CreateUserVariables): Promise<FFType.User> => {
  const response = await graphQL.query<UserQLResult, CreateUserVariables>(`
    mutation createNewUser($name: String!, $email: String!, $password: String!){
      createUser(userInput: {name: $name, email: $email, password: $password}) {
        _id
        name
        email
      }
    }`,
  variables);
  if (response === null) {
    throw new Error('There was a problem creating user');
  }
  return response.createUser;
};

export default createUser;
