import { MutableRefObject, useEffect } from 'react';
import cytoscape, { Core, NodeCollection } from 'cytoscape';
import cola from 'cytoscape-cola';
import { GraphCache, UserEntry } from '/src/fetchers/panda/constants';
import { cytoscapeGraphSpec } from '/src/pages/Panda/utils/cytoscapeGraphSpec';
import { getGraphNodesAndEdges } from '/src/pages/Panda/utils/getGraphNodesAndEdges';
import { addNodeImages } from '/src/pages/Panda/utils/addNodeImages';
import { isElementInViewport } from '/src/pages/Panda/utils/isElementInViewport';

export function useGraph({
  graphRef,
  cytoscapeRef,
  panda,
  graph,
}: {
  graphRef: MutableRefObject<HTMLDivElement | undefined>;
  cytoscapeRef: MutableRefObject<Core | undefined>;
  panda: UserEntry;
  graph: GraphCache;
}) {
  useEffect(() => {
    const { nodes, edges } = getGraphNodesAndEdges({ graph, panda });

    if (graphRef?.current) {
      cytoscape.use(cola);
      cytoscapeRef.current = cytoscape({
        container: graphRef.current,
        ...cytoscapeGraphSpec,
        elements: {
          nodes,
          edges,
        },
      });

      cytoscapeRef?.current?.$id(panda.id).css({
        'background-image': '/panda.jpg',
        opacity: 1,
        width: 1000,
        height: 1000,
      });

      cytoscapeRef.current?.minZoom(0.05);
      cytoscapeRef.current?.maxZoom(0.5);

      cytoscapeRef.current?.ready(async () => {
        cytoscapeRef.current
          ?.animation({
            fit: { padding: 10, eles: cytoscapeRef.current?.nodes() },
            duration: 2000,
            easing: 'ease-in-out-cubic',
          })
          .play();

        const interval = setInterval(() => {
          if (isElementInViewport(graphRef.current as HTMLElement)) {
            clearInterval(interval);
            addNodeImages({
              nodes: cytoscapeRef.current?.nodes() as NodeCollection,
              graph,
            });
          } else {
            console.log('not in viewport yet');
          }
        }, 500);
      });
    }
  }, []);
}
