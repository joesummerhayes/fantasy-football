import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const ITeamType = new GraphQLObjectType({
  name: 'teams',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    id: { type: GraphQLString },
    cleanName: { type: GraphQLString },
    image: { type: GraphQLString },
  },
});

export default ITeamType;
