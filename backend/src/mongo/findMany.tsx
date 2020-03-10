import getPersistent from './persistent';

export const findEvents = async (query: any): any => {
  const db = await getPersistent();

  const collection = await db.collection('events');

  return collection.find({});
};

export default findEvents;
