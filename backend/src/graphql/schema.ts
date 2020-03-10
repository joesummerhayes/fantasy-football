import { GraphQLSchema } from 'graphql';
import RootQueryType from './resolvers/RootQueryType';
import RootMutationType from './resolvers/RootMutationType';

const Schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  // subscription: RootSubscriptionType
});

export default Schema;
