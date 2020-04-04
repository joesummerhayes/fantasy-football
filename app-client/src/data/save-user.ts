import graphQL from './graph-ql';

interface UserQLResult {
  SaveUser: FFType.User;
}

const saveUser = async (user: FFType.User): Promise<FFType.User> => {
  const response = await graphQL.query<UserQLResult>(`
  mutation {
    SaveUser(user: { email:"${user.email}", picture: "${user.picture}", name:"${user.name}"}) {
      email
      name
      picture
    }
  }`);
  return response.SaveUser;
};

export default saveUser;
