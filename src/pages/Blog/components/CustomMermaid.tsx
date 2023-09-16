import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { Brandon } from '/src/fonts/fonts';

mermaid.initialize({
  startOnLoad: true,
  fontFamily: `${Brandon.style.fontFamily} !important `,
});

/**
 * Simple React component to render a mermaid chart.
 *
 * @param chart The string of the chart code
 * @constructor
 */
export default function Mermaid({ chart }: { chart: string }) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);
  return <div className="mermaid">{chart}</div>;
}
