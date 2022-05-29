/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { buildUrl } from '/src/fetchers/panda/buildUrl';
import { getFollowList } from '/src/fetchers/panda/getFollowList';
import {
  GraphCache,
  maxDepth,
  pandaUserId,
} from '/src/fetchers/panda/constants';
import { setupAthlete } from '/src/fetchers/panda/setupAthlete';
import { paginateAllFollow } from '/src/fetchers/panda/pagineAllFollow';
import sizeof from 'object-sizeof';
import { setGraphCache } from '/src/fetchers/panda/setGraphCache';
import { populateGraphCache } from '/src/fetchers/panda/populateGraphCache';

const graphCache: GraphCache = {};

export async function buildPandasGraph(
  athleteId: string,
  depth = 0,
  parentId = ''
) {
  try {
    if (depth === 0) {
      // Populate graph from cache if on the 0th level
      await populateGraphCache({ graphCache });
    }

    if (!graphCache[athleteId]) {
      const { followersDocument, foundAthlete } = await getFollowList(
        buildUrl(pandaUserId, 'followers', 1)
      );
      if (foundAthlete) {
        setupAthlete({
          graphCache,
          athleteId,
          parentId,
          document: followersDocument,
        });
      }
    }

    if (!graphCache[athleteId]?.followFound) {
      console.log('building followers for athlete', graphCache[athleteId].name);
      await paginateAllFollow({
        graphCache,
        athleteId,
        followStatus: 'followers',
        maxIterations: depth > 0 ? 5 : undefined,
      });
      await paginateAllFollow({
        graphCache,
        athleteId,
        followStatus: 'following',
        maxIterations: depth > 0 ? 5 : undefined,
      });

      graphCache[athleteId].followFound = true;

      console.log('Graph has', Object.keys(graphCache).length, 'athletes');
      console.log('In memory cache size:', sizeof(graphCache), 'bytes');
      console.log('setting graph cache...');
      await setGraphCache({ graphCache });
    } else {
      console.log('Already have data for athlete', graphCache[athleteId]?.name);
      console.log('\tmoving on');
    }
    // Go through all athletes children if not at max depth
    if (depth < maxDepth) {
      for (const follower of graphCache[athleteId].followers) {
        await buildPandasGraph(follower, depth + 1, athleteId);
      }
      for (const follower of graphCache[athleteId].following) {
        await buildPandasGraph(follower, depth + 1, athleteId);
      }
    } else {
      console.log('\treached max depth - moving up 👆');
    }

    // make sure to set parent to followers found at the end.
  } catch (error) {
    console.error(error);
  }
}
