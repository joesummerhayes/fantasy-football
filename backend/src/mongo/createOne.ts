import getPersistent from './persistent';

export const createUser = async (query: any): Promise<void> => {
  const db = await getPersistent();

  const collection = await db.collection('users');
  console.log('trying to insert');

  return collection.insert(query);
};

export default createUser;
