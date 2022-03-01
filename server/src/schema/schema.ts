import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import lodash from 'lodash';
import Book from '../models/Book';
import Author from '../models/Author';
import type { Author as AuthorType, Book as BookType, ArgsType } from '..';

const BookTypeGQL: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorTypeGQL,
      resolve(parent, args) {
        // return lodash.find(DUMMY_AUTHORS, { id: parent.authorId });
      },
    },
  }),
});

const AuthorTypeGQL: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookTypeGQL),
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
      type: BookTypeGQL,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return lodash.find(DUMMY_BOOKS, { id: args.id });
      },
    },
    author: {
      type: AuthorTypeGQL,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return lodash.find(DUMMY_AUTHORS, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookTypeGQL),
      resolve() {
        // return DUMMY_BOOKS;
      },
    },
    authors: {
      type: new GraphQLList(AuthorTypeGQL),
      resolve() {
        // return DUMMY_AUTHORS;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorTypeGQL,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args: ArgsType<AuthorType>) {
        const author = new Author({ name: args.name, age: args.age });
        const response = author.save();

        return response;
      },
    },
    addBook: {
      type: BookTypeGQL,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args: ArgsType<BookType>) {
        const book = new Book({ name: args.name, genre: args.genre, authorId: args.authorId });
        const response = book.save();

        return response;
      },
    },
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default Schema;
