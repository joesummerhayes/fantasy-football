import mongoose, { Schema, Document } from 'mongoose';

export interface Team extends Document {
  info: {
    clubMotto: string;
    kitColour: string;
    stadiumName: string;
    styleOfPlay: string;
    teamName: string;
  };
  userId: string;
}

const teamSchema: Schema = new Schema({
  info: {
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
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  // userId: {
  //   type: String,
  //   required: true,
  // },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<Team>('Team', teamSchema);
