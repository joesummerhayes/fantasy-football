import bcrypt from 'bcrypt';
import User from '../models/user';

interface UserArgs {
  userInput: {
    name: string;
    email: string;
    password: string;
  };
}

export default {
  test(): string {
    return 'this is my return';
  },

  async createUser(args: UserArgs) {
    const { userInput } = args;
    const { name, email, password } = userInput;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPw,
    });
    try {
      const createdUser = await user.save();
      return createdUser;
    } catch (err) {
      console.log(err);
    }
  },
};
