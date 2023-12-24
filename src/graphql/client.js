import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://swara.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      "qwwJa5iNIZeyRdOeNCNJTDtXj8vWmg3nvb7vDf6bKY2RCrP1YaKcl1Aejo1A5h3x",
  },
});

export default client;
