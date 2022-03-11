import { useQuery } from "@apollo/client";
import { FC } from "react";
import { BookType } from "../index.d";
import { getBooksQuery } from "../queries/queries";

const BookList: FC = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (error) return <h3>Something went wrong...!</h3>;
    if (!loading) {
      const { books } = data;
      return books.map((book: BookType) => <li key={book.id}>{book.name}</li>);
    }
    return <h3>Loading...</h3>;
  };

  return displayBooks();
};

export default BookList;
