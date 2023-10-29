export const isProd = process.env.VERCEL_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';
