import { Request } from 'express';
import mongoose from 'mongoose';
import Player from '../../models/player';
import PremTeam from '../../models/prem-team';

interface AddPlayerArgs {
  playerInput: {
    firstName: string;
    lastName: string;
    position: string;
    specPositions: [string];
    team: string;
    usedName: string;
  };
}

interface EditPlayerArgs {
  playerInput: {
    _id: string;
    firstName: string;
    lastName: string;
    position: string;
    specPositions: [string];
    team: string;
    usedName: string;
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
  async getPlayers(args: FindPlayersArgs, req: Request): Promise<FFType.Player[]> {
    if (!req.isAuth) {
      throw new Error('not authenticated');
    }

    const isPlayer = (variableToCheck: any): variableToCheck is FFType.Player[] => {
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

  async addPlayer(args: AddPlayerArgs, req: Request): Promise<FFType.Player> {
    try {
      if (!req.isAuth) {
        throw new Error('not authenticated');
      }
      const { playerInput } = args;
      const { firstName, lastName, position, team, usedName, specPositions } = playerInput;

      const player = new Player({
        firstName,
        lastName,
        position,
        specPositions,
        team,
        usedName,
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
  async editPlayer(args: EditPlayerArgs, req: Request): Promise<FFType.Player> {
    try {
      if (!req.isAuth) {
        throw new Error('not authenticated');
      }
      const { playerInput } = args;
      const { firstName, lastName, position, team, usedName, _id, specPositions } = playerInput;

      const id = mongoose.Types.ObjectId(_id);
      const existingPlayer = await Player.findById(id);
      if (!existingPlayer) throw new Error('Could not add or update player');
      existingPlayer.firstName = firstName;
      existingPlayer.lastName = lastName;
      existingPlayer.position = position;
      existingPlayer.specPositions = specPositions;
      existingPlayer.team = team;
      existingPlayer.usedName = usedName;
      const updatedPlayer = existingPlayer.save();
      return updatedPlayer;
    } catch (error) {
      throw new Error('Problem updating player');
    }
  },
};
