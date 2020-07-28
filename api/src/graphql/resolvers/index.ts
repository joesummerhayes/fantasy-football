import playerResolvers from './players';
import authResolvers from './auth';
import teamResolvers from './team';
import leagueResolvers from './league';

export default {
  ...authResolvers,
  ...playerResolvers,
  ...teamResolvers,
  ...leagueResolvers,
};
