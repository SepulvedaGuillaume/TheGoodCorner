import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000",   
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
