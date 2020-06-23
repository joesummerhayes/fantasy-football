import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Player from '../models/player';
import PremTeam from '../models/prem-team';

interface CreateUserArgs {
  userInput: {
    name: string;
    email: string;
    password: string;
  };
}

interface AddPlayerArgs {
  playerInput: {
    firstName: string;
    lastName: string;
    position: string;
    team: string;
  };
}

interface FindPlayersArgs {
  teamName: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    isAuth?: boolean;
    userId: string;
  }
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
      const error = new Error('not authenticated');
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('no user found');
    }
    return user;
  },

  async addPlayer(args: AddPlayerArgs): Promise<FFType.Player> {
    try {
      const { playerInput } = args;
      const { firstName, lastName, position, team } = playerInput;

      const player = new Player({
        firstName,
        lastName,
        position,
        team,
      });

      const premTeam = await PremTeam.findOne({ name: team });
      if (premTeam) {
        premTeam.players.push(player);
        const upatedTeam = await premTeam.save();
        console.log('team already exists, i will just add new player', upatedTeam);
      } else if (!premTeam) {
        const newPremTeam = new PremTeam({
          name: team,
        });
        newPremTeam.players.push(player);
        const createdPremTeam = await newPremTeam.save();
        console.log('team doesnt exist, i will make one', createdPremTeam);
      }

      const createdPlayer = await player.save();

      console.log(createdPlayer);
      return createdPlayer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPlayers(args: FindPlayersArgs): Promise<FFType.Player[]> {

    const isPlayer = (variableToCheck: any): variableToCheck is FFType.Player[] => {
      console.log('variableToCheck', variableToCheck);
      return (variableToCheck as FFType.Player[])[0].firstName !== undefined;
    };

    const { teamName } = args;
    try {
      const team = await PremTeam.findOne({ name: teamName }).populate('players');
      if (team && team.players && isPlayer(team.players)) {
        return team.players;
      }
      throw new Error(`Could not find players for ${teamName}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
