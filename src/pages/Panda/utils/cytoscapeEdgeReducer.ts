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

      agg.push(
        ...user.following.map((id) => ({
          data: {
            source: id,
            target: user.id,
          },
        }))
      );
      agg.push(
        ...user.followers.map((id) => ({
          data: {
            source: user.id,
            target: id,
          },
        }))
      );
    }
    return agg;
  };
