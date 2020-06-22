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
    team: String!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    user: User!
    getPlayers(teamName: String): Player[]!
  }

  type RootMutation {
    createUser(userInput: UserInputData!): User!
    addPlayer(playerInput: PlayerInputData): Player!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
