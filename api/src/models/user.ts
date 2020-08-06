import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  draftLeague: {
    league: FFType.League;
    team?: FFType.Team;
    data?: FFType.LeagueData;
  };
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  draftLeague: {
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    league: {
      type: Schema.Types.ObjectId,
      ref: 'League',
    },
    data: {
      type: Schema.Types.ObjectId,
      ref: 'LeagueData',
    },
  },
});

export default mongoose.model<User>('User', userSchema);
