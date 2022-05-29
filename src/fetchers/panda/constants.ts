export type UserEntry = {
  /** Athlete ID */
  id: string;

  /** Image URL of the athlete */
  imageUrl: string;

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

export const localFileCachePath = '/Users/pjrynewicz/Desktop/graphCache.txt';

export const wait = (ms = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
