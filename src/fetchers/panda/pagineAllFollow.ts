/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { GraphCache } from '/src/fetchers/panda/constants';
import { getFollowList } from '/src/fetchers/panda/getFollowList';
import { buildUrl } from '/src/fetchers/panda/buildUrl';

export async function paginateAllFollow({
  graphCache,
  athleteId,
  followStatus,
  maxIterations = 40,
}: {
  graphCache: GraphCache;
  athleteId: string;
  followStatus: 'followers' | 'following';
  maxIterations?: number;
}) {
  let followersPageNumber = 1;

  let hasAnotherPage = true;

  while (hasAnotherPage) {
    const { followersList, followersDocument } = await getFollowList(
      buildUrl(athleteId, followStatus, followersPageNumber)
    );
    console.log(
      '\tGetting page',
      followersPageNumber,
      'of',
      graphCache[athleteId].name,
      "'s",
      followStatus
    );
    for (const child of Array.from(followersList.children)) {
      if (child) {
        const followerId = child.getAttribute('data-athlete-id');
        if (followerId) {
          const name = child
            ?.getElementsByClassName('avatar-athlete')
            ?.item(0)
            ?.getAttribute('title')
            ?.trim() as string;
          const imageUrl = child
            .getElementsByClassName('avatar-img')
            .item(0)
            ?.getAttribute('src')
            ?.trim() as string;
          const followButton = child.getElementsByClassName('follow').item(0);
          const unfollowButton = child
            .getElementsByClassName('unfollow')
            .item(0);

          // if we have the unfollow button we are following them
          const following = Boolean(unfollowButton);

          // look at children if they have a public account
          const shouldSearchForChildren =
            following ||
            !followButton?.textContent?.toLowerCase()?.includes('request');

          if (!graphCache[followerId]) {
            graphCache[followerId] = {
              id: followerId,
              name,
              imageUrl,
              inGraphFollowers: followStatus === 'following' ? 1 : 0,
              followFound: !shouldSearchForChildren,
              followers: [],
              following: [],
            };
          }
          graphCache[athleteId]?.[followStatus]?.push(followerId);
        }
      }
    }
    followersPageNumber += 1;

    hasAnotherPage =
      Boolean(
        followersDocument
          .getElementsByClassName('next_page')
          .item(0)
          ?.innerHTML?.includes('href')
      ) && followersPageNumber <= maxIterations;
  }
}
