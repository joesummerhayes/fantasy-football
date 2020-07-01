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
    id: string;
  };
  usedName: string;
}
