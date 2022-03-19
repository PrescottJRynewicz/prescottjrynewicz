import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { fonts } from '/design-system/typography';

mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: `${fonts.Brandon} !important `,
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
