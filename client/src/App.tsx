import ApolloClient from "apollo-boost";
import { FC, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Fragment>
        <h1>Miraaj's reading list</h1>
        <BookList />
        <AddBook />
      </Fragment>
    </ApolloProvider>
  );
};

export default App;
