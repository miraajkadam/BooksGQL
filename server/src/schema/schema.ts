import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import lodash from 'lodash';
import Book from '../models/Book';
import Author from '../models/Author';

const BookType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return lodash.find(DUMMY_AUTHORS, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return lodash.filter(DUMMY_BOOKS, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return lodash.find(DUMMY_BOOKS, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return lodash.find(DUMMY_AUTHORS, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        // return DUMMY_BOOKS;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        // return DUMMY_AUTHORS;
      },
    },
  },
});

const Schema = new GraphQLSchema({ query: RootQuery });

export default Schema;
