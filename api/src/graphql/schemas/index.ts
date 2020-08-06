
import { buildSchema } from 'graphql';
import { inputData } from './input-data';
import { mutations } from './mutations';
import { queries } from './queries';
import { types } from './types';

export default buildSchema(`
  ${types}
  ${inputData}
  ${queries}
  ${mutations}
  scalar DateTime

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
