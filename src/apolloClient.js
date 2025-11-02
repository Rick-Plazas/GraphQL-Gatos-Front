// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-gatos.onrender.com", //Puerto del back ya desplegado
  }),
  cache: new InMemoryCache(),
});

export default client;
