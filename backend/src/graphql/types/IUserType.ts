import { GraphQLObjectType, GraphQLString } from 'graphql';

const IUserType = new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export default IUserType;
