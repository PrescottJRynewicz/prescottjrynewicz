import { MutableRefObject, useEffect } from 'react';
import cytoscape, { Core } from 'cytoscape';
import cola from 'cytoscape-cola';
import {
  GraphCache,
  pandaUserId,
  UserEntry,
} from '/src/fetchers/panda/constants';
import { cytoscapeGraphSpec } from '/src/pages/Panda/utils/cytoscapeGraphSpec';
import { getGraphNodesAndEdges } from '/src/pages/Panda/utils/getGraphNodesAndEdges';
import { addNodeAnimation } from '/src/pages/Panda/utils/addNodeAnimation';

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

      cytoscapeRef.current?.minZoom(0.05);
      cytoscapeRef.current?.maxZoom(0.5);

      cytoscapeRef.current?.ready(async () => {
        cytoscapeRef.current
          ?.animation({
            fit: { padding: 10, eles: cytoscapeRef.current?.nodes() },
          })
          .play();

        cytoscapeRef.current?.nodes().map(async (node) => {
          const user = graph[node.id()];
          if (user) {
            const dimension =
              user.id === pandaUserId ? 1000 : Math.random() * 200 + 30;

            node.css({
              'background-image': graph[node.id()].base64Url,
              width: dimension,
              height: dimension,
            });

            addNodeAnimation({ node });
          }
        });
      });
    }
  }, []);
}
