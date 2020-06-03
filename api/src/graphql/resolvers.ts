import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface CreateUserArgs {
  userInput: {
    name: string;
    email: string;
    password: string;
  };
}

interface LoginArgs {
  email: string;
  password: string;
}

export default {
  async createUser(args: CreateUserArgs) {
    const { userInput } = args;
    const { name, email, password } = userInput;
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: 'Email is not valid' });
    }
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
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

  async login(args: LoginArgs) {
    const { email, password } = args;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('password is incorrect');
      throw error;
    }
    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email,
    }, 'supersecretsecret', { expiresIn: '1h' });

    return { token, userId: user._id.toString() };
  },
};
