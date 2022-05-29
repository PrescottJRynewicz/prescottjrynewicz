export function buildUrl(
  userId: string,
  followType: 'following' | 'followers',
  page: number
) {
  return `https://www.strava.com/athletes/${userId}/follows?page=${page}&page_uses_modern_javascript=true&type=${followType}`;
}
