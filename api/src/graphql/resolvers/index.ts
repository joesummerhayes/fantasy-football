import GraphQLDateTime from 'graphql-iso-date';
import playerResolvers from './players';
import authResolvers from './auth';
import teamResolvers from './team';
import leagueResolvers from './league';

export default {
  DateTime: GraphQLDateTime,
  ...authResolvers,
  ...playerResolvers,
  ...teamResolvers,
  ...leagueResolvers,
};
