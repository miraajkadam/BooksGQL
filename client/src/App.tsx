import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { FC, Fragment } from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
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
