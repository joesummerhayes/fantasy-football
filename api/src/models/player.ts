import mongoose, { Schema, Document } from 'mongoose';

export interface Player extends Document {
  firstName: string;
  lastName: string;
  position: string;
  specPositions: string[];
  team: {
    teamId: string;
    name: string;
  };
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
  specPositions: {
    type: [String],
    required: true,
  },
  team: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  usedName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Player>('Player', playerSchema);
