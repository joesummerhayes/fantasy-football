import express, { Response, NextFunction, Request } from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import graphqlSchema from './graphql/schema';
import graphiqlResolver from './graphql/resolvers';

import authMiddleware from './middleware/auth';

interface Error {
  statusCode?: number;
  message?: string;
}

config();

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

app.use(authMiddleware);

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphiqlResolver,
  graphiql: true,
  customFormatErrorFn(err) {
    console.log('graphql failed', err);
    if (!err.originalError) {
      return err;
    }
    let errorLocation = '';
    if (err.path) {
      console.log(err.path[0]);
      errorLocation = err.path[0].toString();
    }
    const message = 'an error occurred';
    const code = 500;
    return {
      message,
      status: code,
      specificError: err.message,
      errorLocation,
    };
  },
}));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { message } = error;
  res.status(500).json({ message });
});

const mongoConfig = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(`${process.env.MONGO_URL}`, mongoConfig)
  .then(() => {
    app.listen(4000, () => console.log('express graphql server is now running on localhost:4000/graphql !'));
  })
  .catch((err) => {
    console.log(err);
  });
