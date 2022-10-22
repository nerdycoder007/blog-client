import "../styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
const authLink = setContext((req, prev) => {
  return {
    headers: {
      Authorization: `Bearer ABC`,
    },
  };
});
const httpLink = createUploadLink(
  { uri: "http://localhost:8000/graphql", credentials: "include" },
  { "Apollo-Require-Preflight": "true" }
);
const client = new ApolloClient({
  // link:authLink.concat(httpLink),
  link: httpLink, // Must be link:
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
