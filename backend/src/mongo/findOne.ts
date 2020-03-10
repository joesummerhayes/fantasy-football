import { ObjectId } from 'mongodb';
import getPersistent from './persistent';

interface Query {
  id: number;
}

export const findEvent = async (query: Query): any => {
  const db = await getPersistent();

  const collection = await db.collection('events');
  const document = await collection.findOne({
    _id: new ObjectId(query.id),
  });
  return document;

};

export default findEvent;
