import { FC, PropsWithChildren } from "react";
import { DataProps, graphql } from "react-apollo";
import { BookType } from "../index.d";
import { getBooksQuery } from "../queries/queries";

interface Props extends PropsWithChildren<Partial<DataProps<{}, {}>>> {}

const BookList: FC<Props> = (props) => {
  const displayBooks = () => {
    const { data } = props;

    if (data) {
      if (data.loading) {
        return <div>Loading Books...!</div>;
      } else {
        return (data as any).books.map((book: BookType) => <li key={book.id}>{book.name}</li>);
      }
    }
  };

  return displayBooks();
};

export default graphql(getBooksQuery)(BookList);
