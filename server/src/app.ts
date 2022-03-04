import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import Schema from './schema/schema';

const app: Application = express();

mongoose.connect('mongodb://localhost:27017/BooksDB');
mongoose.connection.once('open', () => {
  console.info('Connected to Database...!');
});

app.use('/graphql', graphqlHTTP({ schema: Schema, graphiql: true }));

app.listen(4000, () => {
  console.info(`Listening on PORT 4000`);
});
