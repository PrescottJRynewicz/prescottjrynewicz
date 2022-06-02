import { GraphCache } from '/src/fetchers/panda/constants';

export function setupAthlete({
  graphCache,
  athleteId,
  parentId,
  document,
}: {
  graphCache: GraphCache;
  athleteId: string;
  parentId: string;
  document: Document;
}) {
  if (!graphCache[athleteId]) {
    const avatarElement = document.getElementsByClassName('avatar-xl').item(0);
    const parentName = avatarElement?.getAttribute('title');
    const parentImageUrl = avatarElement
      ?.getElementsByClassName('avatar-img')
      .item(0)
      ?.getAttribute('src');
    graphCache[athleteId] = {
      id: athleteId,
      following: [],
      followers: [],
      followFound: false,
      imageUrl: parentImageUrl as string,
      name: parentName as string,
      inGraphFollowers: 0,
    };
  }
  if (parentId && graphCache[parentId]) {
    graphCache[parentId].inGraphFollowers += 1;
  }
}
