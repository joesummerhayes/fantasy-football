import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import IPostType from '../types/IPostType';
import ITeamType from '../types/ITeamType';
import { findEvent } from '../../mongo/findOne';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    GetPosts: {
      type: new GraphQLList(IPostType),
      async resolve(obj, args, ctx) {
        const firstEvent = await findEvent({ name: 'lozzzz' }, 'events');
        console.log('1111', firstEvent);
        return [firstEvent];
      },
    },
    GetPostById: {
      type: IPostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(args): Promise<FFType.PremTeam> {
        const firstEvent = await findEvent({ id: args.id }, 'events');
        console.log('2222', args.id, firstEvent);
        return firstEvent;
      },
    },
    GetTeamById: {
      type: ITeamType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(obj, args, ctx) {
        const team = await findEvent({ id: args.id }, 'teams');
        console.log('trying to get team with id: ', args.id, team);
        return team;
      },
    },
  },
});

export default RootQueryType;

