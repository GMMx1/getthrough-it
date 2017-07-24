export const ENV = process.env.NODE_ENV || 'development'
export const isProd = ENV === 'production'
export const PORT = process.env.PORT || 8000
export const SECRET_KEY = process.env.SECRET_KEY
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL
