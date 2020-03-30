// responsible for starting the graphql server
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import initGraphqlServer from './graphql/server';
import { findEvent } from './mongo/findOne';
import { createTeam } from './mongo/createTeam';
import Request from 'superagent';
const fetch = require("node-fetch");

interface Team {
  id: string;
  name: string;
  cleanName: string;
  image: string;
}

async function run() {
  console.log('hi');
  const app = express();
  const PORT = process.env.PORT || 4001;

  // standard express middlewares
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // connect to MongoDB
  // const firstEvent = await findEvent({name: 'lozzzz'});
  // const createdEvent = await createEvent({
  //   name: 'a completely different document',
  // });

  // const teams = `https://api.footystats.org/league-teams?key=${process.env.FOOTY_STATS_API_KEY}&league_id=2012`;
  // Request.get(teams).then((response) => {
  //   console.log(response.body.data);
  //   const teamArray = response.body.data;
  //   teamArray.map(async (team: Team) => {
  //     const { name, cleanName, image, id } = team;
  //     const teamToCreate = { name, cleanName, image, id };
  //     const foo = await createTeam(teamToCreate);
  //   });
  // });


  //wI9IkCUMfZuWHP1w06M51dqO3AcQq20XgbTUJ51CorDBxu6amrinidm5RgVj
  // init graphql server
  console.log('pre graph ql')
  const graphqlServer = initGraphqlServer();

  // start HTTP server
  const httpServer = createServer(app);

  graphqlServer.applyMiddleware({ app });
  graphqlServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at.... http://localhost:${PORT}${graphqlServer.graphqlPath}`,
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${graphqlServer.subscriptionsPath}`,
    );
  });
}

process.on('unhandledRejection', (error) => {
  // Will print 'unhandledRejection err is not defined'
  console.log('unhandledRejection', error);
});

export default run;
