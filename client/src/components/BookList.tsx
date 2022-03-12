import { useQuery } from "@apollo/client";
import { FC, Fragment, MouseEvent, useState } from "react";
import { BookType } from "../index.d";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList: FC = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const [selectedBookId, setSelectedBookId] = useState<string>();

  const displayBooks = () => {
    if (error) return <h3>Something went wrong...!</h3>;
    if (!loading) {
      const { books } = data;
      return books.map((book: BookType) => (
        <li
          key={book.id}
          onClick={(event: MouseEvent<HTMLLIElement>) => {
            setSelectedBookId(book.id);
          }}
        >
          {book.name}
        </li>
      ));
    }
    return <h3>Loading...</h3>;
  };

  return (
    <Fragment>
      <ul id="book-list">{displayBooks()}</ul>
      {selectedBookId ? (
        <BookDetails id={selectedBookId} />
      ) : (
        <div id="book-details">
          <h1>No book selected</h1>
        </div>
      )}
    </Fragment>
  );
};

export default BookList;
