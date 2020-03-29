import { ObjectId } from 'mongodb';
import getPersistent from './persistent';

interface Query {
  id: number;
}

type Collections = 'events' | 'teams'

export const findEvent = async (query: Query, collectionName: Collections): Promise<FFType.PremTeam> => {
  const db = await getPersistent();

  const collection = await db.collection(collectionName);
  const document = await collection.findOne({
    _id: new ObjectId(query.id),
  });
  return document;

};

export default findEvent;
