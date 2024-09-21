import { Request } from 'express'
import { TokenPayload } from './models/requests/auth.request'
import { User } from './models/schemas/user.schema'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refreshToken?: TokenPayload
  }
}
