import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
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

  type Team {
    name: String!
    id: ID!
  }

  type PlayerWithTeam {
    _id: ID!
    firstName: String!
    lastName: String!
    position: String!
    specPositions: [String]!
    team: Team!
    usedName: String!
  }

  type AuthData {
    token: String!
    userId: String!
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

  input editPlayerInputData {
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
    editPlayer(playerInput: editPlayerInputData): Player!
    deletePlayer(id: String, teamId: String): String!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
