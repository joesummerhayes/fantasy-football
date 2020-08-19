import mongoose, { Schema, Document } from 'mongoose';

export interface League extends Document {
  leagueInfo: {
    draftDate: Date;
    gameweekStart: string;
    leagueName: string;
    members: FFType.User[];
    passcode: string;
  };
  players: FFType.LeaguePlayer[];
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
  },
  players: [
    {
      playerInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      numberOfTransfers: {
        type: Number,
        requred: true,
      },
      minFeeRelease: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model<League>('League', leagueSchema);
