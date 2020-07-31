import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  team?: FFType.Team;
  league?: FFType.League;
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
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
  },
});

export default mongoose.model<User>('User', userSchema);
