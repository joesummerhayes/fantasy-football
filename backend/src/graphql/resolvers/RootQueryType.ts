import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import IPostType from '../types/IPostType';
import { IPost } from '../../models/post';
import { findEvent } from '../../mongo/findOne';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    GetPosts: {
      type: new GraphQLList(IPostType),
      async resolve(obj, args, ctx) {
        const firstEvent = await findEvent({ name: 'lozzzz' });
        console.log('1111', firstEvent);
        return [firstEvent];
      },
    },
    GetPostById: {
      type: IPostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(obj, args, ctx) {
        const firstEvent = await findEvent({ id: args.id });
        console.log('2222', args.id, firstEvent);
        return firstEvent;
      },
    },
  },
});

export default RootQueryType;
