export const PORT = process.env.PORT || 8000
export const SECRET_KEY = process.env.SECRET_KEY
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

export const DB_CONFIG = {
  "development": {
    "username": process.env.DB_USER_DEV,
    "password": process.env.DB_PASS_DEV,
    "database": process.env.DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": process.env.DB_DIALECT_DEV || 'mysql'
  },
  "test": {
    "username": process.env.DB_USER_TEST,
    "password": process.env.DB_PASS_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": process.env.DB_DIALECT_TEST || 'mysql'
  },
  "production": {
    "username": process.env.DB_USER_PROD,
    "password": process.env.DB_PASS_PROD,
    "database": process.env.DB_NAME_PROD,
    "host": process.env.DB_HOST_PROD,
    "dialect": process.env.DB_DIALECT_PROD || 'mysql'
  }
}

