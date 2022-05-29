import { MutableRefObject, useEffect } from 'react';
import cytoscape, { Core, EdgeDefinition, NodeDefinition } from 'cytoscape';
import cola from 'cytoscape-cola';
import {
  GraphCache,
  oneSecond,
  pandaUserId,
  UserEntry,
} from '/src/fetchers/panda/constants';

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
    const n0 = 50;
    const n1 = 10;

    const followerChunk = panda.followers.slice(0, n0);
    const followingChunk = panda.following.slice(0, n0);

    const nodes: NodeDefinition[] = [
      {
        data: {
          id: panda.id,
        },
      },
      ...followerChunk.reduce<NodeDefinition[]>((agg, current) => {
        const user = graph[current];
        agg.push({ data: { id: user.id } });
        if (user) {
          const followerSlice = user.followers.slice(0, n1);
          const followingSlice = user.following.slice(0, n1);

          agg.push(
            ...followerSlice.map((id) => ({
              data: { id },
            }))
          );
          agg.push(
            ...followingSlice.map((id) => ({
              data: { id },
            }))
          );
        }

        return agg;
      }, []),
      ...followingChunk.reduce<NodeDefinition[]>((agg, current) => {
        const user = graph[current];
        agg.push({ data: { id: user.id } });
        if (user) {
          const followerSlice = user.followers.slice(0, n1);
          const followingSlice = user.following.slice(0, n1);

          agg.push(
            ...followerSlice.map((id) => ({
              data: { id },
            }))
          );
          agg.push(
            ...followingSlice.map((id) => ({
              data: { id },
            }))
          );
        }

        return agg;
      }, []),
    ];
    const edges: EdgeDefinition[] = [
      ...followingChunk.reduce<EdgeDefinition[]>((agg, current) => {
        const user = graph[current];
        if (user) {
          agg.push({
            data: {
              source: panda.id,
              target: user.id,
            },
          });

          const followerSlice = user.followers.slice(0, n1);
          const followingSlice = user.following.slice(0, n1);

          agg.push(
            ...followerSlice.map((id) => ({
              data: {
                source: id,
                target: user.id,
              },
            }))
          );
          agg.push(
            ...followingSlice.map((id) => ({
              data: {
                source: user.id,
                target: id,
              },
            }))
          );
        }
        return agg;
      }, []),
      ...followerChunk.reduce<EdgeDefinition[]>((agg, current) => {
        const user = graph[current];
        if (user) {
          agg.push({
            data: {
              source: panda.id,
              target: user.id,
            },
          });

          const followerSlice = user.followers.slice(0, n1);
          const followingSlice = user.following.slice(0, n1);

          agg.push(
            ...followerSlice.map((id) => ({
              data: {
                source: id,
                target: user.id,
              },
            }))
          );
          agg.push(
            ...followingSlice.map((id) => ({
              data: {
                source: user.id,
                target: id,
              },
            }))
          );
        }
        return agg;
      }, []),
    ];

    if (graphRef?.current) {
      cytoscape.use(cola);

      cytoscapeRef.current = cytoscape({
        container: graphRef.current,

        boxSelectionEnabled: false,
        layout: {
          // @ts-ignore
          name: 'cola',
          randomize: true,
          infinite: true,
          fit: false,
          nodeSpacing() {
            return 50;
          },
        },
        style: cytoscape
          // @ts-ignore
          .stylesheet()
          .selector('node')
          .css({
            height: 200,
            width: 200,
            'background-fit': 'cover',
            'border-color': '#000',
            'border-width': 3,
            'border-opacity': 1,
          })
          .selector('edge')
          .css({
            width: 2,
            'target-arrow-shape': 'triangle',
            'line-color': 'rbga(0,0,0,0.1)',
            'target-arrow-color': '#000000',
          }),
        elements: {
          nodes,
          edges,
        },
      });

      cytoscapeRef.current
        .$id(panda.id)
        .position({ x: 500, y: 500 })
        .lock()
        .css({ width: 300, height: 300 });

      cytoscapeRef.current?.nodes().map(async (node) => {
        const user = graph[node.id()];
        if (user) {
          const dimension =
            user.id === pandaUserId ? 600 : Math.random() * 200 + 30;

          node.css({
            // 'background-image': user.imageUrl,
            width: dimension,
            height: dimension,
          });
        }
      });

      (async () => {
        await oneSecond();
        cytoscapeRef.current
          ?.animation({
            fit: { padding: 10, eles: cytoscapeRef.current?.nodes() },
          })
          .play();
      })();
    }
  }, []);
}
