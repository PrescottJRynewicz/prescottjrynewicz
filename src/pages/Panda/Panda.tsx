import React, { MutableRefObject, useRef } from 'react';
import { Core } from 'cytoscape';
import { useGraph } from '/src/pages/Panda/effects/useGraph';
import { GraphCache, UserEntry } from '/src/fetchers/panda/constants';
import styled from 'styled-components';

export type PandaProps = {
  panda: UserEntry;
  graph: GraphCache;
};

const Container = styled.div``;

export function Panda({ panda, graph }: PandaProps) {
  const graphRef = useRef<HTMLDivElement>();
  const cytoscapeRef = useRef<Core>();

  useGraph({ graphRef, cytoscapeRef, panda, graph });

  return (
    <Container>
      <div
        id="Rec-Graph"
        ref={graphRef as MutableRefObject<HTMLDivElement>}
        style={{
          backgroundColor: 'transparent',
          width: '100vw',
          height: '100vh',
        }}
      />
    </Container>
  );
}
