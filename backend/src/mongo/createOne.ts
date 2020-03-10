import getPersistent from './persistent';

export const createEvent = async (query: any): any => {
  const db = await getPersistent();

  const collection = await db.collection('events');
  console.log('trying to insert');

  return collection.insert(query);
};

export default createEvent;
