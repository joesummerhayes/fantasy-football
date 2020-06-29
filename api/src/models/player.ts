import mongoose, { Schema, Document } from 'mongoose';

export interface Player extends Document {
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  usedName: string;
}

const playerSchema: Schema = new Schema({
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
});

export default mongoose.model<Player>('Player', playerSchema);
