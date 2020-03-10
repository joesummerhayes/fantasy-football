import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import IPostType from '../types/IPostType';
import { IPost } from '../../models/post';

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    SaveDeal: {
      type: IPostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(obj, args, ctx) {
        console.log(args);
        return 'hello';
      },
    },
  },
});

export default RootMutationType;
