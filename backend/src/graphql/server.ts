// will contain all the graphql specific code. 
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { Db } from 'mongodb';
import Schema from './schema';

export default function server() {
  console.log('hello')
  return new ApolloServer({
    schema: Schema,
    subscriptions: {
      path: '/subscriptions',
      onConnect: async () => {
        console.log('Subscription client connected using Apollo servers built-in SubscriptionServer.');
      },
      onDisconnect: async () => {
        console.log('Subscription client disconnected.');
      },
    },
    cacheControl: {
      defaultMaxAge: 5,
    },
    introspection: true,
    plugins: [responseCachePlugin()],
  });
}
