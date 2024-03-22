export function getUrl(path?: string) {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? `http://localhost:3000/${path || ''}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${path || ''}`
      : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${path || ''}`;
}

export function getApiUrl(path?: string) {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? `http://localhost:3000/api/${path || ''}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/${path || ''}`
      : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/${path || ''}`;
}
