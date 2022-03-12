import { gql } from "@apollo/client";

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
