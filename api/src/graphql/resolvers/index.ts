import playerResolvers from './players';
import authResolvers from './auth';
import teamResolvers from './team';

export default {
  ...authResolvers,
  ...playerResolvers,
  ...teamResolvers,
};
