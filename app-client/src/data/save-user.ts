import graphQL from './graph-ql';

interface UserQLResult {
  user: FFType.User;
}

const saveUser = async (user: FFType.User): Promise<void> => {
  console.log('CALLING SAVE USER MUTATION', user);
  const newUser = await graphQL.query<UserQLResult>(`
  mutation {
    SaveUser(user: { email:"${user.email}", picture: "${user.picture}", name:"${user.name}"}) {
      email
    }
  }`);
  console.log('BOO', newUser);
}

export default saveUser;
