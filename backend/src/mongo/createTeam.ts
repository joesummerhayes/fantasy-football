import getPersistent from './persistent';

interface Team {
  id: string;
  name: string;
  cleanName: string;
  image: string;
}

export const createTeam = async (team: Team): any => {
  const db = await getPersistent();

  const collection = await db.collection('teams');
  console.log('trying to insert');

  return collection.insert(team);
};

export default createTeam;
