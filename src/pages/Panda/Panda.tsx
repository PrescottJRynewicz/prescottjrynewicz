import React, { MutableRefObject, useRef } from 'react';
import { Core } from 'cytoscape';
import { useGraph } from '/src/pages/Panda/effects/useGraph';
import { GraphCache, UserEntry } from '/src/fetchers/panda/constants';

export type PandaProps = {
  panda: UserEntry;
  graph: GraphCache;
};

export function Panda({ panda, graph }: PandaProps) {
  const graphRef = useRef<HTMLDivElement>();
  const cytoscapeRef = useRef<Core>();

  useGraph({ graphRef, cytoscapeRef, panda, graph });

  return (
    <div>
      <h1>Panda</h1>
      <div
        id="Rec-Graph"
        ref={graphRef as MutableRefObject<HTMLDivElement>}
        style={{
          width: '95%',
          height: '850px',
          border: 'solid #FF037C 3px',
          borderRadius: '10px',
          marginBottom: '20px',
          marginTop: '10px',
          marginLeft: '30px',
          marginRight: '30px',
        }}
      />
    </div>
  );
}
