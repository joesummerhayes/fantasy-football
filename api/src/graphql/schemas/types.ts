export const types = `
  type User {
    _id: ID!
    name: String!
    email: String
    draftLeague: DraftLeague
  }

  type DraftLeague {
    league: League!
    team: Team
  }

  type Player {
    _id: ID!
    firstName: String!
    lastName: String!
    position: String!
    specPositions: [String]!
    team: String!
    usedName: String!
  }

  type PremTeam {
    name: String!
    id: ID!
  }

  type PlayerWithTeam {
    _id: ID!
    firstName: String!
    lastName: String!
    position: String!
    specPositions: [String]!
    team: PremTeam!
    usedName: String!
  }

  type TeamInfo {
      clubMotto: String!
      kitColour: String!
      teamName: String!
      stadiumName: String!
      styleOfPlay: String!
  }

  type Team {
    _id: ID!
    info: TeamInfo!
    userId: String!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  type LeagueInfo {
    draftDate: DateTime!
    gameweekStart: String!
    leagueName: String!
    members: [User]!
    passcode: String!
  }

  type League {
    _id: ID!
    leagueInfo: LeagueInfo
  }
`;

export default {};
