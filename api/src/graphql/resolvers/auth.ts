import { Request } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

interface CreateUserArgs {
  userInput: {
    name: string;
    email: string;
    password: string;
  };
}

export default {
  async createUser(args: CreateUserArgs): Promise<FFType.User> {
    const { userInput } = args;
    const { name, email, password } = userInput;
    const errors = [];
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists for this email');
    }

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
      throw err;
    }
  },

  async login(args: FFType.LoginCredentials): Promise<FFType.LoggedInUser> {
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

  async user(_args: any, req: Request): Promise<FFType.User> {
    if (!req.isAuth) {
      throw new Error('not authenticated');
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('no user found');
    }
    return user;
  },
};
