import { GraphCache } from '/src/fetchers/panda/constants';
import { NodeDefinition } from 'cytoscape';

export const cytoscapeNodeReducer =
  (graph: GraphCache) => (agg: NodeDefinition[], current: string) => {
    const user = graph[current];
    if (user) {
      agg.push({ data: { id: user.id } });
      user.following.forEach((id) => {
        if (graph[id]) {
          agg.push({
            data: { id },
          });
        }
      });
      user.followers.forEach((id) => {
        if (graph[id]) {
          agg.push({
            data: { id },
          });
        }
      });
    }

    return agg;
  };
