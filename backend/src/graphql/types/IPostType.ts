import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const IPostType = new GraphQLObjectType({
  name: 'post',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export default IPostType;
