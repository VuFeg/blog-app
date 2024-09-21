import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/auth.request'

interface signTokenProps {
  payload: string | Buffer | object
  privateKey: string
  options?: SignOptions
}

export const signToken = ({ payload, privateKey, options = { algorithm: 'HS256' } }: signTokenProps) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}

interface verifyTokenProps {
  token: string
  privateKey: string
}

export const verifyToken = ({ token, privateKey }: verifyTokenProps) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded as TokenPayload)
    })
  })
}
