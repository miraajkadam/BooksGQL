import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import Schema from './schema/schema';

const app: Application = express();

app.use('/graphql', graphqlHTTP({ schema: Schema, graphiql: true }));

app.listen(4000, () => {
  console.log(`Listening on PORT 4000`);
});
