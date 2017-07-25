export const ENV = process.env.NODE_ENV || 'development'
export const isProd = ENV === 'production'
export const PORT = process.env.PORT || 8000
export const SECRET_KEY = process.env.SECRET_KEY
export const GITHUB_CLIENT_ID = process.env.[isProd ? 'GITHUB_CLIENT_ID_PROD' : 'GITHUB_CLIENT_ID']
export const GITHUB_CLIENT_SECRET = process.env.[isProd ? 'GITHUB_CLIENT_SECRET_PROD' : 'GITHUB_CLIENT_SECRET']
export const GITHUB_CALLBACK_URL = process.env.[isProd ? 'GITHUB_CALLBACK_URL_PROD' : 'GITHUB_CALLBACK_URL']
