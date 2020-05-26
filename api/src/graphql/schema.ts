import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
  }

  input UserInputData {
    name: String!
    email: String!
    password: String!
  }

  type RootQuery {
    test: String
  }

  type RootMutation {
    createUser(userInput: UserInputData!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
