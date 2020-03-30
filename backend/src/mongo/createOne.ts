import getPersistent from './persistent';

export const createUser = async (query: FFType.User): Promise<void> => {
  const db = await getPersistent();
  console.log('trying to insert', query);

  const collection = await db.collection('users');
  const userExists = collection.findOne({
    email: query.email,
  });

  if (userExists) return undefined;

  return collection.insert(query);
};

export default createUser;
