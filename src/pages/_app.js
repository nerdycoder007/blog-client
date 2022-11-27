import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import "../styles/globals.css";
import { login } from "../redux/slices/authSlice";

const authLink = setContext((req, prev) => {
  return {
    headers: {
      Authorization: `Bearer ABC`,
      ramu: "true",
    },
  };
});
const httpLink = createUploadLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": true,
  },
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <div className="flex h-screen flex-col">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
