import mongoose, { Schema, Document } from 'mongoose';

export interface League extends Document {
  draftDate: Date;
  gameweekStart: string;
  leagueName: string;
  members: FFType.User[];
}

const leagueSchema: Schema = new Schema({
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
});

export default mongoose.model<League>('League', leagueSchema);
