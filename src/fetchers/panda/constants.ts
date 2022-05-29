export type UserEntry = {
  /** Athlete ID */
  id: string;

  /** Image URL of the athlete */
  imageUrl: string;

  /** Base 64 encoded image */
  base64Url?: string;

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
  'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/72628082_704359796723329_6848302590820304450_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=mCp6kbBLDH0AX9dWtIJ&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjE3ODc4MTYxNjQxNTQyNjMxMw%3D%3D.2-ccb7-5&oh=00_AT_N5HpOzX2Y4A1mTFRjL9yc3QGTDnEX36C-paEEv7Bt1Q&oe=629B4E5D&_nc_sid=30a2ef';

export const localFileCachePath = '/Users/pjrynewicz/Desktop/graphCache.txt';
export const miniLocalFileCachePath =
  '/Users/pjrynewicz/Desktop/miniGraphCache.txt';

export const wait = (ms = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
