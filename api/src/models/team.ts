import mongoose, { Schema, Document } from 'mongoose';

export interface Team extends Document {
  _id: string;
  clubMotto: string;
  kitColour: string;
  stadiumName: string;
  styleOfPlay: string;
  teamName: string;
}

const teamSchema: Schema = new Schema({
  clubMotto: {
    type: String,
    required: true,
  },
  kitColour: {
    type: String,
    required: true,
  },
  stadiumName: {
    type: String,
    required: true,
  },
  styleOfPlay: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<Team>('Team', teamSchema);
