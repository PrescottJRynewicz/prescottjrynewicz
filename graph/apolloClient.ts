import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

const domain =
  process.env.NEXT_PUBLIC_WEBSITE_URL ||
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const httpLink = new HttpLink({
  uri: `${domain}/api/graphql`,
});

export const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});
