import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphiqlResolver from './graphql/resolvers';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphiqlResolver,
  graphiql: true,
  customFormatErrorFn(err) {
    console.log('graphql failed');
    if (!err.originalError) {
      return err;
    }
    const message = 'an error occurred';
    const code = 500;
    return {
      message,
      status: code,
    };
  },
}));

app.listen(4000, () => console.log('express graphql server is now running on localhost:4000/graphql !'));
