import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString } from 'graphql';

const IUserType = new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export const IUserInputType = new GraphQLInputObjectType({
  name: 'userInputType',
  fields: {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export default IUserType;
