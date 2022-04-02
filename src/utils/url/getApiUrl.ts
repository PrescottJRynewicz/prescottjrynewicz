export function getUrl(path?: string) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/${path || ''}`
    : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${path || ''}`;
}

export function getApiUrl(path?: string) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/api/${path || ''}`
    : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/${path || ''}`;
}
