import getPersistent from './persistent';

export const createUser = async (query: FFType.User): Promise<FFType.User> => {
  const db = await getPersistent();

  const collection = await db.collection('users');
  const userExists = await collection.findOne({
    email: query.email,
  });

  if (userExists) {
    console.log('user already exists, returning...')
    return query;
  }

  console.log('new user, saving to database!');
  return collection.insert(query);
};

export default createUser;
