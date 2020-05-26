import { buildSchema } from 'graphql';

export default buildSchema(`
  type RootQuery {
    test: String!
  }

  schema {
    query: RootQuery
  }
`);
