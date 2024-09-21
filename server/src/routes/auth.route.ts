import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/auth.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const authRouter = Router()

authRouter.post('/login', loginValidator, wrapHandleRequest(loginController))
authRouter.post('/register', registerValidator, wrapHandleRequest(registerController))
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapHandleRequest(logoutController))

export default authRouter
