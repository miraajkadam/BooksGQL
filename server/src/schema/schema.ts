import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import lodash from 'lodash';

const DUMMY_BOOKS = [
  { name: 'Lorem ipsum dolor sit amet.', id: '1', authorId: '1' },
  { name: 'Lorem, ipsum dolor.', id: '2', authorId: '2' },
  { name: 'Lorem, ipsum..', id: '3', authorId: '2' },
];

const DUMMY_AUTHORS = [
  { name: 'Lorem ipsum dolor sit amet.', age: '22', id: '1' },
  { name: 'Lorem, ipsum dolor.', age: '23', id: '2' },
  { name: 'Lorem, ipsum..', age: '24', id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return lodash.find(DUMMY_AUTHORS, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(DUMMY_BOOKS, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(DUMMY_AUTHORS, { id: args.id });
      },
    },
  },
});

const Schema = new GraphQLSchema({ query: RootQuery });

export default Schema;
