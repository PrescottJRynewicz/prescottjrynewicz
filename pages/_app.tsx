/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/notion-styles.css';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

import { Brandon } from '/src/fonts/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Globally optimized styling and font optimization */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        html {
          font-family: ${Brandon.style.fontFamily};
        }
        body {
          font-family: ${Brandon.style.fontFamily};
        }
        button {
          font-family: ${Brandon.style.fontFamily};
        }
        a {
          font-family: ${Brandon.style.fontFamily};
        }
      `}</style>
      <div id="app" className={Brandon.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
