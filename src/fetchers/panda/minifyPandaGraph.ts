import { GraphCache, pandaUserId } from '/src/fetchers/panda/constants';
import { populateGraphCache } from '/src/fetchers/panda/populateGraphCache';

const n0 = 50;
const n1 = 10;

export async function minifyPandaGraph() {
  const graphCache: GraphCache = {};

  await populateGraphCache({ graphCache });

  const newCache: GraphCache = {};

  const panda = graphCache[pandaUserId];

  const followerSlice = panda.followers.slice(0, n0);
  const followingSlice = panda.following.slice(0, n0);

  const userIdSet = new Set<string>();

  followerSlice.forEach(
    extractChildren({
      graphCache,
      newCache,
      continueTraversal: true,
      numberOfChildren: n1,
      userIdSet,
    })
  );
  followingSlice.forEach(
    extractChildren({
      graphCache,
      newCache,
      continueTraversal: true,
      numberOfChildren: n1,
      userIdSet,
    })
  );

  newCache[panda.id] = {
    ...panda,
    imageUrl: graphCache[panda.id].imageUrl,
    followers: [...followerSlice],
    following: [...followingSlice],
  };

  // Uncomment to set the remote cache if desired
  // setGraphCache({
  //   graphCache: Object.keys(newCache).reduce<GraphCache>((agg, current) => {
  //     agg[current] = {
  //       ...newCache[current],
  //       base64Url: undefined,
  //     };
  //     return agg;
  //   }, {}),
  // });

  return newCache;
}

const extractChildren =
  ({
    graphCache,
    newCache,
    continueTraversal = false,
    numberOfChildren,
    userIdSet,
  }: {
    graphCache: GraphCache;
    newCache: GraphCache;
    numberOfChildren: number;
    continueTraversal?: boolean;
    userIdSet: Set<string>;
  }) =>
  (followId: string) => {
    const user = graphCache[followId];

    if (user && !userIdSet.has(user.id)) {
      userIdSet.add(user.id);
      if (user) {
        const followingSlice = user.following.slice(0, numberOfChildren);
        const followerSlice = user.followers.slice(0, numberOfChildren);

        if (continueTraversal) {
          followingSlice.forEach(
            extractChildren({
              graphCache,
              newCache,
              numberOfChildren: 0,
              continueTraversal: false,
              userIdSet,
            })
          );
          followerSlice.forEach(
            extractChildren({
              graphCache,
              newCache,
              numberOfChildren: 0,
              continueTraversal: false,
              userIdSet,
            })
          );
        }

        newCache[followId] = {
          ...user,
          imageUrl: graphCache[followId].imageUrl,
          followers: [...followerSlice],
          following: [...followingSlice],
        };
      }
    }
  };
