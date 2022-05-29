import { MutableRefObject, useEffect } from 'react';
import cytoscape, { Core } from 'cytoscape';
import cola from 'cytoscape-cola';
import {
  GraphCache,
  wait,
  pandaUserId,
  UserEntry,
} from '/src/fetchers/panda/constants';
import { cytoscapeGraphSpec } from '/src/pages/Panda/utils/cytoscapeGraphSpec';
import { getGraphNodesAndEdges } from '/src/pages/Panda/utils/getGraphNodesAndEdges';

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

      cytoscapeRef.current
        .$id(panda.id)
        .position({ x: 500, y: 500 })
        .lock()
        .css({ width: 300, height: 300, 'background-image': panda.base64Url });

      cytoscapeRef.current?.nodes().map(async (node) => {
        const user = graph[node.id()];
        if (user) {
          const dimension =
            user.id === pandaUserId ? 600 : Math.random() * 200 + 30;

          node.css({
            'background-image': graph[node.id()].base64Url,
            width: dimension,
            height: dimension,
          });
        }
      });

      (async () => {
        await wait(100);
        cytoscapeRef.current
          ?.animation({
            fit: { padding: 10, eles: cytoscapeRef.current?.nodes() },
          })
          .play();
      })();
    }
  }, []);
}
