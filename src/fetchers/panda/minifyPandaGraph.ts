import fs from 'fs';
import {
  GraphCache,
  localFileCachePath,
  pandaUserId,
} from '/src/fetchers/panda/constants';

const n0 = 50;
const n1 = 20;

export function minifyPandaGraph() {
  const localString = fs.readFileSync(localFileCachePath).toString();
  const graphCache: GraphCache = JSON.parse(localString);

  const newCache: GraphCache = {};

  const panda = graphCache[pandaUserId];

  const followerSlice = panda.followers.slice(0, n0);
  const followingSlice = panda.following.slice(0, n0);

  followerSlice.forEach(
    extractChildren({
      graphCache,
      newCache,
      continueTraversal: true,
      numberOfChildren: n1,
    })
  );
  followingSlice.forEach(
    extractChildren({
      graphCache,
      newCache,
      continueTraversal: true,
      numberOfChildren: n1,
    })
  );

  newCache[panda.id] = {
    ...panda,
    followers: [...followerSlice],
    following: [...followingSlice],
  };

  return newCache;
}

const extractChildren =
  ({
    graphCache,
    newCache,
    continueTraversal = false,
    numberOfChildren,
  }: {
    graphCache: GraphCache;
    newCache: GraphCache;
    numberOfChildren: number;
    continueTraversal?: boolean;
  }) =>
  (followId: string) => {
    const user = graphCache[followId];

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
          })
        );
        followerSlice.forEach(
          extractChildren({
            graphCache,
            newCache,
            numberOfChildren: 0,
            continueTraversal: false,
          })
        );
      }

      newCache[followId] = {
        ...user,
        followers: [...followerSlice],
        following: [...followingSlice],
      };
    }
  };
