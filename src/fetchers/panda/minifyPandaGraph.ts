import {
  GraphCache,
  pandaImageUrl,
  pandaUserId,
} from '/src/fetchers/panda/constants';
import fetch from 'node-fetch';
import { populateGraphCache } from '/src/fetchers/panda/populateGraphCache';

const n0 = 50;
const n1 = 10;
const jpgDataUrlPrefix = 'data:image/png;base64,';

export async function minifyPandaGraph() {
  const graphCache: GraphCache = {};

  await populateGraphCache({ graphCache });

  const newCache: GraphCache = {};

  const panda = graphCache[pandaUserId];

  const result = await fetch(pandaImageUrl);
  const imageBuffer = Buffer.from(await result.arrayBuffer());

  const imageDataUrl = jpgDataUrlPrefix + imageBuffer.toString('base64');

  const followerSlice = panda.followers.slice(0, n0);
  const followingSlice = panda.following.slice(0, n0);

  await Promise.allSettled([
    ...followerSlice.map(
      extractChildren({
        graphCache,
        newCache,
        continueTraversal: true,
        numberOfChildren: n1,
      })
    ),
    ...followingSlice.map(
      extractChildren({
        graphCache,
        newCache,
        continueTraversal: true,
        numberOfChildren: n1,
      })
    ),
  ]);

  newCache[panda.id] = {
    ...panda,
    imageUrl: graphCache[panda.id].imageUrl,
    base64Url: imageDataUrl,
    followers: [...followerSlice],
    following: [...followingSlice],
  };

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

const userIdSet = new Set<string>();

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
  async (followId: string) => {
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

        const result = await fetch(user.imageUrl);
        const imageBuffer = Buffer.from(await result.arrayBuffer());
        // const sharpResult = await sharp(imageBuffer)
        //   .resize({ width: 50, height: 50 })
        //   .toBuffer();
        const imageBase64 = imageBuffer.toString('base64');
        const imageDataUrl = jpgDataUrlPrefix + imageBase64;

        newCache[followId] = {
          ...user,
          imageUrl: graphCache[followId].imageUrl,
          base64Url: imageDataUrl,
          followers: [...followerSlice],
          following: [...followingSlice],
        };
      }
    }
  };
