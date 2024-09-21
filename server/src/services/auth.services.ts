import { envConfig } from '~/utils/config'
import { signToken } from '~/utils/jwt'
import database from './database.services'
import { RefreshToken } from '~/models/schemas/refreshToken.schema'
import { ObjectId } from 'mongodb'
import { RegisterReqBody } from '~/models/requests/auth.request'
import { User } from '~/models/schemas/user.schema'
import { hashPassword } from '~/utils/hashPassword'
import { USER_MESSAGES } from '~/constants/message'

class AuthService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id },
      privateKey: envConfig.accessTokenSecret,
      options: { expiresIn: '7d', algorithm: 'HS256' }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id },
      privateKey: envConfig.refreshTokenSecret,
      options: { expiresIn: '30d', algorithm: 'HS256' }
    })
  }

  private signBothTokens(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signBothTokens(user_id)
    await database.refreshToken.insertOne(new RefreshToken({ user_id: new ObjectId(user_id), token: refreshToken }))

    return { accessToken, refreshToken }
  }

  async register(body: RegisterReqBody) {
    const userId = new ObjectId()
    await database.users.insertOne(new User({ ...body, _id: userId, password: hashPassword(body.password) }))
    const [accessToken, refreshToken] = await this.signBothTokens(userId.toString())
    await database.refreshToken.insertOne(new RefreshToken({ user_id: userId, token: refreshToken }))
    return { accessToken, refreshToken }
  }

  async logout(refreshToken: string) {
    await database.refreshToken.deleteOne({ token: refreshToken })
    return { message: USER_MESSAGES.LOGOUT_SUCCESS }
  }
}

const authService = new AuthService()

export default authService
