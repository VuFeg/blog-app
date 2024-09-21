import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  name: string
  username: string
  email: string
  password: string
}

export interface LogoutReqBody {
  refreshToken: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
