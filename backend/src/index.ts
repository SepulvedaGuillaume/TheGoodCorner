import "reflect-metadata";

import startApolloServer from "./startApollo";

try {
  startApolloServer();
} catch (error) {
  console.error("Error starting Apollo Server", error);
}
