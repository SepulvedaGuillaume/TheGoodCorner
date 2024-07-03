import "@/styles/globals.sass";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "@/pages/layout";
import { BasketProvider } from "@/contexts/basketContext";
import { CategoryProvider } from "@/contexts/categoryContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <BasketProvider>
        <CategoryProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CategoryProvider>
      </BasketProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
