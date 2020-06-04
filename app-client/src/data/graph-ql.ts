import { API_URL } from '../env';
import fetch from './simple-fetch';

interface GraphQlError extends Error {
  extensions?: {
    exception: Error;
  };
}

export class GraphQL {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async query<T, V = undefined>(query: string, variables?: V, operationName?: string): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query, operationName, variables }),
    });
    const { data, errors = [] } = await response.json();
    if (errors.length > 0) {
      const exceptions = errors.map((err: GraphQlError) => {
        if (err.extensions && err.extensions.exception) {
          return err.extensions.exception;
        }
        return err;
      });
      console.error('GraphQL.query', exceptions);
    }
    return data;
  }
}

// export default new GraphQL(`${API_URL}/graphql`);

// currently forcing to localhost
// TODO use env variables
export default new GraphQL('http://localhost:4000/graphql');
