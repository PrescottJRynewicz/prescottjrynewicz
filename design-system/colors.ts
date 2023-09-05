export const solids = Object.freeze({
  // GOGYFT Colors
  DARK_KNIGHT: '#1E1D21',
  WHITE_KNIGHT: '#FFFFFF',
  PAPER: '#E9D4BA',
  RUST: '#DD3A31',
  ROYAL: '#3226D2',
  GRASSHOPPER: '#71B949',
  AGUA: '#47ABDF',
  MIMOSA: '#E2C22B',
  MILK: '#F8EDE1',
  PINK_STARBURST: '#E06D98',
});

export type Solids = keyof typeof solids;
export type SolidValues = (typeof solids)[Solids];

export const textures = Object.freeze({
  DARK_KNIGHT: '/textures/DARK_KNIGHT.png',
  PAPER: '/textures/PAPER.png',
  RUST: '/textures/RUST.png',
  ROYAL: '/textures/ROYAL.png',
  GRASSHOPPER: '/textures/GRASSHOPPER.png',
  AGUA: '/textures/AGUA.png',
  MIMOSA: '/textures/MIMOSA.png',
  PINK_STARBURST: '/textures/PINK_STARBURST.png',
});

export type Textures = keyof typeof textures;
export type TextureUrls = (typeof solids)[Textures];

export const speckles = Object.freeze({
  BASIC: '/textures/speckled/BASIC.png',
  BASIC_LOW: '/textures/speckled/BASIC_LOW.png',
  DARK_KNIGHT: '/textures/speckled/DARK_KNIGHT.png',
  PAPER: '/textures/speckled/PAPER.png',
  RUST: '/textures/speckled/RUST.png',
  ROYAL: '/textures/speckled/ROYAL.png',
  GRASSHOPPER: '/textures/speckled/GRASSHOPPER.png',
  AGUA: '/textures/speckled/AGUA.png',
  MIMOSA: '/textures/speckled/MIMOSA.png',
  MILK: '/textures/speckled/MILK.png',
  PINK_STARBURST: '/textures/speckled/PINK_STARBURST.png',
});

export type Speckles = keyof typeof speckles;
export type SpeckleUrls = (typeof speckles)[Speckles];
