import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/user';

interface UserArgs {
  userInput: {
    name: string;
    email: string;
    password: string;
  };
}

export default {
  async createUser(args: UserArgs) {
    const { userInput } = args;
    const { name, email, password } = userInput;
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: 'Email is not valid' });
    }
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 10 })) {
      errors.push({ message: 'password is too short' });
    }
    if (errors.length > 0) {
      const error = new Error('invalid input');
      throw error;
    }
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
