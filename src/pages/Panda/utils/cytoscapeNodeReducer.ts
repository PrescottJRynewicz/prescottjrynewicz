import { GraphCache } from '/src/fetchers/panda/constants';
import { NodeDefinition } from 'cytoscape';

export const cytoscapeNodeReducer =
  (graph: GraphCache) => (agg: NodeDefinition[], current: string) => {
    const user = graph[current];
    agg.push({ data: { id: user.id } });
    if (user) {
      agg.push(
        ...user.following.map((id) => ({
          data: { id },
        }))
      );
      agg.push(
        ...user.followers.map((id) => ({
          data: { id },
        }))
      );
    }

    return agg;
  };
