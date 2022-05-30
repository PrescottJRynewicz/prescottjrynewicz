import { MutableRefObject, useEffect } from 'react';
import cytoscape, { Core } from 'cytoscape';
import cola from 'cytoscape-cola';
import {
  GraphCache,
  pandaUserId,
  UserEntry,
  waitFor,
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

      cytoscapeRef?.current
        ?.$id(panda.id)
        .css({
          'background-image': '/panda.jpg',
          opacity: 1,
          width: 1000,
          height: 1000,
        })
        .position({ x: 500, y: 500 });

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

        cytoscapeRef.current?.nodes().map(async (node) => {
          const user = graph[node.id()];
          if (user) {
            const dimension =
              user.id === pandaUserId ? 1000 : Math.random() * 200 + 30;

            await waitFor(2000);
            if (user.id !== pandaUserId) {
              fetch(
                `http://localhost:3000/api/images/proxy?imageUrl=${
                  graph[node.id()].imageUrl
                }`
              ).then(async (response) => {
                const result = await response.text();

                node.style({
                  display: 'element',
                  'background-image': result,
                });
                node.animate({
                  style: {
                    opacity: 1,
                  },
                  duration: 1000,
                  easing: 'ease-in-out',
                });

                node.connectedEdges().forEach((edge) => {
                  edge.animate({
                    style: {
                      opacity: 0.1,
                    },
                    duration: 1000,
                    easing: 'ease-in-out',
                  });
                });

                // cytoscapeRef.current
                //   ?.animation({
                //     fit: { padding: 10, eles: cytoscapeRef.current?.nodes() },
                //   })
                //   .play();
                addNodeAnimation({
                  node,
                });
              });
            }
            node.css({
              width: dimension,
              height: dimension,
            });
          }
        });
      });
    }
  }, []);
}
