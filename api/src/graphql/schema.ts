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
    team: String!
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
    _id: String
    firstName: String!
    lastName: String!
    position: String!
    team: String!
    usedName: String!
  }

  input editPlayerInputData {
    _id: String
    firstName: String!
    lastName: String!
    position: String!
    team: String!
    usedName: String!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    user: User!
    getPlayers(teamName: String!): [Player]
  }

  type RootMutation {
    createUser(userInput: UserInputData!): User!
    player(playerInput: PlayerInputData): Player!
    editPlayer(playerInput: editPlayerInputData): Player!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
