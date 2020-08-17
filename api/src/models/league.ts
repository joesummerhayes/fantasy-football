import mongoose, { Schema, Document } from 'mongoose';

export interface League extends Document {
  leagueInfo: {
    draftDate: Date;
    gameweekStart: string;
    leagueName: string;
    members: FFType.User[];
    passcode: string;
  };
}

const leagueSchema: Schema = new Schema({
  leagueInfo: {
    draftDate: {
      type: Date,
      required: true,
    },
    gameweekStart: {
      type: String,
      required: true,
    },
    leagueName: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    passcode: {
      type: String,
      required: true,
    },
    players: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        position: {
          type: String,
          required: true,
        },
        specPositions: {
          type: [String],
          required: true,
        },
        team: {
          type: String,
          required: true,
        },
        usedName: {
          type: String,
          required: true,
        },
        premTeam: {
          type: Schema.Types.ObjectId,
          ref: 'PremTeams',
        },
      },
    ],
  },
});

export default mongoose.model<League>('League', leagueSchema);
