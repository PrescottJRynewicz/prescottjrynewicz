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

        .notion-h1,
        .notion-h2,
        notion-h3,
        .notion-h4,
        .notion-h5,
        .notion-h6 {
          font-family: ${Shrimp.style.fontFamily};
          text-transform: uppercase;
        }

        .notion-text {
          font-family: ${Brandon.style.fontFamily};
          font-size: 1.4em;
          font-weight: 200;
        }

        .notion-hr {
          background-color: rgba(0, 0, 0, 0.2);
          height: 2px;
        }
      `}</style>
      <div id="app" className={Brandon.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
