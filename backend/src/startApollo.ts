import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AdQueries } from "./resolvers/AdQueries";
import { AdMutations } from "./resolvers/AdMutations";
import { CategoryQueries } from "./resolvers/CategoryQueries";

export default async function startApolloServer() {
  const schema = await buildSchema({
    resolvers: [AdQueries, AdMutations, CategoryQueries]
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
