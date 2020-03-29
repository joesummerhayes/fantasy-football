import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import IUserType, { IUserInputType } from '../types/IUserType';
import { IUser } from '../../models/user';
import { createUser } from '../../mongo/createOne';

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    SaveUser: {
      type: IUserType,
      args: {
        user: { type: new GraphQLNonNull(IUserInputType) },
      },
      async resolve(obj, args, ctx) {
        await createUser(args.user);
        return args.user;
      },
    },
  },
});

export default RootMutationType;
