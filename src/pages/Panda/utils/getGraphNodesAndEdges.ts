import { EdgeDefinition, NodeDefinition } from 'cytoscape';
import { cytoscapeNodeReducer } from '/src/pages/Panda/utils/cytoscapeNodeReducer';
import { cytoscapeEdgeReducer } from '/src/pages/Panda/utils/cytoscapeEdgeReducer';
import { GraphCache, UserEntry } from '/src/fetchers/panda/constants';

export function getGraphNodesAndEdges({
  panda,
  graph,
}: {
  panda: UserEntry;
  graph: GraphCache;
}) {
  const nodes: NodeDefinition[] = [
    {
      data: {
        id: panda.id,
      },
    },
    ...panda.following.reduce<NodeDefinition[]>(
      cytoscapeNodeReducer(graph),
      []
    ),
    ...panda.followers.reduce<NodeDefinition[]>(
      cytoscapeNodeReducer(graph),
      []
    ),
  ];

  const edges: EdgeDefinition[] = [
    ...panda.following.reduce<EdgeDefinition[]>(
      cytoscapeEdgeReducer(graph),
      []
    ),
    ...panda.followers.reduce<EdgeDefinition[]>(
      cytoscapeEdgeReducer(graph),
      []
    ),
  ];

  return {
    nodes,
    edges,
  };
}
