export const inputData = `
  input LeagueInputData {
    draftDate: DateTime!
    gameweekStart: String!
    leagueName: String!
  }

  input UserInputData {
    name: String!
    email: String!
    password: String!
  }

  input PlayerInputData {
    firstName: String!
    lastName: String!
    position: String!
    specPositions: [String]!
    team: String!
    usedName: String!
  }

  input TeamInputData {
    clubMotto: String!
    kitColour: String!
    teamName: String!
    stadiumName: String!
    styleOfPlay: String!
  }

  input EditPlayerInputData {
    _id: String
    firstName: String!
    lastName: String!
    position: String!
    specPositions: [String]!
    team: String!
    usedName: String!
  }
`;

export default {};
