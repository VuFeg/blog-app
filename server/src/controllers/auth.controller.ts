import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { USER_MESSAGES } from '~/constants/message'
import { LoginReqBody, LogoutReqBody, RegisterReqBody } from '~/models/requests/auth.request'
import { User } from '~/models/schemas/user.schema'
import authService from '~/services/auth.services'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as User)._id?.toString()
  const result = await authService.login(userId as string)
  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.LOGIN_SUCCESSFULLY,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body
  console.log(body)
  const result = await authService.register(body)
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    message: USER_MESSAGES.REGISTER_SUCCESSFULLY,
    result
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body.refreshToken
  const result = await authService.logout(refreshToken)
  return res.status(HTTP_STATUS_CODE.OK).json(result)
}
