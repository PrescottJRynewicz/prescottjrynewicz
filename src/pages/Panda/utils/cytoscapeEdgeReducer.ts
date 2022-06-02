import { GraphCache, pandaUserId } from '/src/fetchers/panda/constants';
import { EdgeDefinition } from 'cytoscape';

export const cytoscapeEdgeReducer =
  (graph: GraphCache) => (agg: EdgeDefinition[], current: string) => {
    const panda = graph[pandaUserId];
    const user = graph[current];
    if (user) {
      agg.push({
        data: {
          source: panda.id,
          target: user.id,
        },
      });

      user.following.forEach((id) => {
        if (graph[id]) {
          agg.push({
            data: {
              source: id,
              target: user.id,
            },
          });
        }
      });
      user.followers.forEach((id) => {
        if (graph[id]) {
          agg.push({
            data: {
              source: id,
              target: user.id,
            },
          });
        }
      });
    }
    return agg;
  };
