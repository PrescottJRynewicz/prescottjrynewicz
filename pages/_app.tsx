import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'graph/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="app">
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}
export default MyApp;
