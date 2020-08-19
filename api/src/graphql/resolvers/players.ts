import { Request } from 'express';
import mongoose, {Mongoose, Types} from 'mongoose';
import Player from '../../models/player';
import User from '../../models/user';
import PremTeam from '../../models/prem-team';
import League from '../../models/league';

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

interface DeletePlayerArgs {
  id: string;
  teamId: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    isAuth?: boolean;
    userId: string;
  }
}

export default {
  async getPlayers(args: FindPlayersArgs, req: Request): Promise<FFType.LeaguePlayer[]> {
    if (!req.isAuth) {
      throw new Error('not authenticated');
    }

    // const isPlayer = (variableToCheck: any): variableToCheck is FFType.Player[] => {
    //   return (variableToCheck as FFType.Player[])[0].firstName !== undefined;
    // };

    const { teamName } = args;
    const { userId } = req;

    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('user does not exist');
      }
      const leagueId = user.draftLeague.league;

      const league = await League.findById(leagueId, 'players').populate('players.playerInfo').exec();
      if (!league) {
        throw new Error('user is not member of a league');
      }
      const filteredPlayers = league.players.filter((player) => {
        console.log(player.playerInfo.team.name, teamName);
        return player.playerInfo.team.name === teamName;
      });

      console.log('filtered players', filteredPlayers);
      return filteredPlayers;
    } catch (error) {
      console.log(error);
      throw new Error('could not find players for this club');
    }
    // try {
    //   const premTeamCursor = await PremTeam.findOne({ name: teamName }).populate('players').exec();
    //   const premTeam = premTeamCursor?.toObject();
    //   if (premTeam?.players && isPlayer(premTeam?.players)) {
    //     const { players } = premTeam;
    //     const teamId = premTeam._id;
    //     const playersWithTeam = players.map((player: FFType.Player) => {
    //       return {
    //         ...player,
    //         team: {
    //           id: teamId,
    //           name: player.team,
    //         },
    //       };
    //     });
    //     return playersWithTeam;
    //   }
    //   throw new Error(`Could not find players for ${teamName}`);
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  },

  async addPlayer(args: AddPlayerArgs, req: Request): Promise<FFType.PlayerWithTeam> {
    try {
      if (!req.isAuth) {
        throw new Error('not authenticated');
      }
      const { playerInput } = args;
      const { firstName, lastName, position, team, usedName, specPositions } = playerInput;

      const premTeam = await PremTeam.findOne({ name: team });

      let player;

      if (premTeam) {
        // team already exists on database, simply add player to team
        player = new Player({
          firstName,
          lastName,
          position,
          specPositions,
          team: {
            id: premTeam._id.toString(),
            name: team,
          },
          usedName,
        });
        premTeam.players.push(player);
        await premTeam.save();
      } else if (!premTeam) {
        // team doesnt exists on database and must be created
        const newPremTeam = new PremTeam({
          name: team,
        });
        const premTeamWithId = await newPremTeam.save();

        player = new Player({
          firstName,
          lastName,
          position,
          specPositions,
          team: {
            id: premTeamWithId._id.toString(),
            name: team,
          },
          usedName,
        });
        newPremTeam.players.push(player);
        await newPremTeam.save();
      }
      if (!player) {
        throw new Error('there was a problem creating player');
      }

      const createdPlayer = await player.save();

      console.log(createdPlayer);
      return createdPlayer;

    } catch (error) {
      console.log(error);
      throw new Error('Failed to create player, make sure all fields are filled out');
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
  async deletePlayer(args: DeletePlayerArgs, req: Request): Promise<string> {
    if (!req.isAuth) {
      throw new Error('not authenticated');
    }
    try {
      const { id, teamId } = args;
      await Player.findByIdAndRemove(id);
      const team = await PremTeam.findById(teamId);
      if (team) {
        team.players.pull(id);
        await team.save();
      }
      return `deleted successfully for playerId ${id}`;
    } catch (error) {
      throw new Error('failed to delete player');
    }
  },
};
