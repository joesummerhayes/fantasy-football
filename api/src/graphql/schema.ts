import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String
    team: Team
    league: League
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

  type League {
    _id: ID!
    draftDate: DateTime!
    gameweekStart: String!
    leagueName: String!
    members: [User]!
    passcode: String!
  }

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

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    user: User!
    getPlayers(teamName: String!): [PlayerWithTeam]
  }

  type RootMutation {
    createUser(userInput: UserInputData!): User!
    addPlayer(playerInput: PlayerInputData): Player!
    editPlayer(playerInput: EditPlayerInputData): Player!
    deletePlayer(id: String, teamId: String): String!
    createTeam(teamInput: TeamInputData!): Team!
    createLeague(leagueInput: LeagueInputData!): League!
  }

  scalar DateTime

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
