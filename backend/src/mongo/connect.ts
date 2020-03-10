import { Db, MongoClient } from 'mongodb';

async function connect() {
  console.log('pr', process.env.MONGO_URL);
  const URL = process.env.MONGO_URL || 'local mongo instance connection URL';

  const client = new MongoClient(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('client set');

  const conn = await client.connect();
  console.log('🔗 Connected to Mongo');
  return conn.db('events-react-dev');
}

export default connect;
