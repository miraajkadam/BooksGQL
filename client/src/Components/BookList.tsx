import { gql } from "apollo-boost";
import React, { FC } from "react";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList: FC = (props) => {
  console.log(props);

  return (
    <div>
      <ul>
        <li>Book Name</li>
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
