import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AdQueries } from "./resolvers/AdQueries";
import { AdMutations } from "./resolvers/AdMutations";
import { CategoryQueries } from "./resolvers/CategoryQueries";
import { TagsQueries } from "./resolvers/TagsQueries";
import { UserQueries } from "./resolvers/UserQueries";
import { UserMutations } from "./resolvers/UserMutations";
import { cleanDB, dataSource, initTestData } from "./sql/dataSource";
import jwt from "jsonwebtoken";

export default async function startApolloServer() {
  console.log("Starting Apollo Server");

  const schema = await buildSchema({
    resolvers: [
      AdQueries,
      AdMutations,
      CategoryQueries,
      TagsQueries,
      UserQueries,
      UserMutations,
    ],
    authChecker: ({ context }, roles: string[]) => {
      if (
        context.user &&
        (roles.length == 0 || roles.includes(context.user.role))
      ) {
        return true;
      }
      return false;
    },
  });

  const server = new ApolloServer({ schema });

  await dataSource.initialize();

  // await cleanDB();
  // await initTestData();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authHeader: string | undefined = req.headers.authorization;
      let user = null;
      if (authHeader?.startsWith("Bearer ") === true) {
        const tokenValue: string = authHeader.substring("Bearer ".length);

        const jwtSecret: string | undefined = process.env.JWT_SECRET;
        if (!jwtSecret) {
          throw new Error("invalid JWT secret");
        }

        user = jwt.verify(tokenValue, jwtSecret);
      }

      return { user };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
