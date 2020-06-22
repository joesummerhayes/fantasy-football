import mongoose, { Schema, Document } from 'mongoose';
import { Player } from './player';

export interface IPremTeam extends Document {
  name: string;
  players: Player['_id'];
}

const premTeamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
  }],
});

export default mongoose.model<IPremTeam>('Prem-team', premTeamSchema);
