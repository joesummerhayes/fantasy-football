import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

// Only being kept for a reference (delete when want)

const IPostType = new GraphQLObjectType({
  name: 'post',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export default IPostType;
