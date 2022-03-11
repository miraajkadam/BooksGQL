import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { FC, Fragment } from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
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
