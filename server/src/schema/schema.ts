import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import type { Author as AuthorType, Book as BookType } from '..';
import Author from '../models/Author';
import Book from '../models/Book';

const BookTypeGQL: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorTypeGQL,
      resolve(parent: Pick<BookType, 'id'>, args) {
        const author = Author.findById(parent.id);
        return author;
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
      resolve(parent: Pick<AuthorType, 'id'>, args) {
        return Book.find({ authorId: parent.id });
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
      resolve(parent, args: Pick<BookType, 'id'>) {
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorTypeGQL,
      args: { id: { type: GraphQLID } },
      resolve(parent, args: Pick<AuthorType, 'id'>) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookTypeGQL),
      resolve() {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorTypeGQL),
      resolve() {
        return Author.find({});
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args: Pick<AuthorType, 'name' | 'age'>) {
        const author = new Author({ name: args.name, age: args.age });
        const response = author.save();

        return response;
      },
    },
    addBook: {
      type: BookTypeGQL,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args: Pick<BookType, 'name' | 'genre' | 'authorId'>) {
        const book = new Book({ name: args.name, genre: args.genre, authorId: args.authorId });
        const response = book.save();

        return response;
      },
    },
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default Schema;
