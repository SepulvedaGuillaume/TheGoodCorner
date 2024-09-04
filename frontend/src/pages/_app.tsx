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
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "@/contexts/authContext";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BasketProvider>
          <CategoryProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CategoryProvider>
        </BasketProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
