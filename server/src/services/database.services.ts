import { Collection, Db, MongoClient } from 'mongodb'
import { RefreshToken } from '~/models/schemas/refreshToken.schema'
import { User } from '~/models/schemas/user.schema'
import { envConfig } from '~/utils/config'

const uri = `mongodb+srv://${envConfig.mongodbUsername}:${envConfig.mongodbPassword}@${envConfig.mongodbName}.h0say.mongodb.net/?retryWrites=true&w=majority&appName=${envConfig.mongodbName}`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.mongodbName)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('You successfully connected to the database')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getCollection(collection: string) {
    return this.db.collection(collection)
  }

  get users(): Collection<User> {
    return this.db.collection(envConfig.mongodbUsersCollection)
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(envConfig.mongodbRefreshTokenCollection)
  }
}

const database = new DatabaseService()

export default database
