export const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';
