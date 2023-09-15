/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';

import { Brandon, Shrimp } from '/src/fonts/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Globally optimized styling and font optimization.
       These styles are added here because you can't import the next
       optimized fonts into css files 
       */}
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

        .notion-h1,
        .notion-h2,
        notion-h3,
        .notion-h4,
        .notion-h5,
        .notion-h6 {
          font-family: ${Shrimp.style.fontFamily};
          text-transform: uppercase;
        }

        .notion-page {
          --notion-font: ${Brandon.style.fontFamily};
          font-size: 1.3em;
          font: ${Brandon.style.fontFamily};
          font-weight: 200;
        }
      `}</style>
      <div id="app" className={Brandon.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
