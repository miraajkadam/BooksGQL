import { useQuery } from "@apollo/client";
import { FC, useState } from "react";
import { BookType } from "../index.d";
import { getBookQuery } from "../queries/queries";

type Props = {
  id: string | undefined;
};

const BookDetails: FC<Props> = (props) => {
  const [bookDetails, setBookDetails] = useState<BookType | undefined>();

  const { id } = props;
  const { loading, error, data } = useQuery(getBookQuery, { variables: { id } });

  function displayBookDetails() {
    if (error) return <h1>Something went wrong...!</h1>;

    if (!loading && data) {
      const book = data.book;
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books by this author: </p>
          <ul className="other-books">
            {book.author.books.map((book: BookType) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...!</div>;
    }
  }

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
