export type UserEntry = {
  /** Athlete ID */
  id: string;

  /** Image URL of the athlete */
  imageUrl: string;

  /** Base 64 encoded image */
  // base64Url?: string;

  /** Name of the athlete */
  name: string;
  /** Boolean: True if the athletes followers have been cached */
  followFound: boolean;

  /** The number of in graph followers the athlete has */
  inGraphFollowers: number;

  /** string[]: Array of follower IDs */
  followers: string[];

  /** string[]: Array of following IDs */
  following: string[];
};
export type GraphCache = Record<string, UserEntry>;

export const maxDepth = 1;
export const pandaUserId = '3281746';

export const pandaImageUrl =
  'https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e7ea5501-d72f-4b8b-a320-564eee3c17da/72628082_704359796723329_6848302590820304450_n.jpg?table=block';
export const localFileCachePath = '/Users/pjrynewicz/Desktop/graphCache.txt';
export const miniLocalFileCachePath =
  '/Users/pjrynewicz/Desktop/miniGraphCache.txt';

export const waitFor = (ms = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
