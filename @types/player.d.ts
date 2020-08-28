export interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  specPositions: string[];
  team: string;
  usedName: string;
}

export interface PlayerWithTeam {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  specPositions: string[];
  team: {
    name: string;
    teamId: string;
  };
  usedName: string;
}

export interface LeaguePlayer {
  playerInfo: PlayerWithTeam;
  minFeeRelease: number;
  numberOfTransfers: number;
}
