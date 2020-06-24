import playerResolvers from './players';
import authResolvers from './auth';

export default {
  ...authResolvers,
  ...playerResolvers,
};
