export function getApiUrl(path?: string) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/api/${path || ''}`
    : `https://${process.env.VERCEL_URL}/api/${path || ''}`;
}
