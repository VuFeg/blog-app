import { config } from 'dotenv'
config()

export const envConfig = {
  port: process.env.PORT as string,
  mongodbUsername: process.env.MONGODB_USERNAME as string,
  mongodbPassword: process.env.MONGODB_PASSWORD as string,
  mongodbName: process.env.MONGODB_DB_NAME as string,
  mongodbUsersCollection: process.env.MONGODB_USERS_COLLECTION as string,
  mongodbRefreshTokenCollection: process.env.MONGODB_REFRESH_TOKEN_COLLECTION as string,
  mongodbFollowersCollection: process.env.MONGODB_FOLLOWERS_COLLECTION as string,
  mongodbPostsCollection: process.env.MONGODB_POSTS_COLLECTION as string,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string
}
