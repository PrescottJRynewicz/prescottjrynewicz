/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'graph/apolloClient';
import '../styles/notion-styles.css';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for collection views (optional)
import 'rc-dropdown/assets/index.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

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
