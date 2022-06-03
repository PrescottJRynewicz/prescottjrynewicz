/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { NodeCollection, NodeSingular } from 'cytoscape';
import {
  GraphCache,
  pandaUserId,
  waitFor,
} from '/src/fetchers/panda/constants';
import { getApiUrl } from '/src/utils/url/getApiUrl';
import { addNodeAnimation } from '/src/pages/Panda/utils/addNodeAnimation';

export async function addNodeImages({
  nodes,
  graph,
}: {
  nodes: NodeCollection;
  graph: GraphCache;
}) {
  await waitFor(2000);

  // eslint-disable-next-line no-restricted-syntax
  for (const node of Array.from(nodes)) {
    const user = graph[node.id()];
    if (user) {
      const dimension =
        user.id === pandaUserId ? 1000 : Math.random() * 200 + 30;

      if (user.id !== pandaUserId) {
        fetchAndAssignImage({ node, graph });
      }
      addNodeAnimation({ node });

      node.css({
        width: dimension,
        height: dimension,
      });
    }
  }
}

async function fetchAndAssignImage({
  node,
  graph,
}: {
  node: NodeSingular;
  graph: GraphCache;
}) {
  fetch(getApiUrl(`images/proxy?imageUrl=${graph[node.id()].imageUrl}`)).then(
    async (response) => {
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
        if (String(edge.renderedCss().opacity) === '0') {
          edge.animate({
            style: {
              opacity: 0.1,
            },
            duration: 1000,
            easing: 'ease-in-out',
          });
        }
      });
    }
  );
}
