import { Router } from 'express'
import {
  followController,
  getMeController,
  getSuggestsController,
  getUserProfileController,
  unfollowController
} from '~/controllers/user.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { followValidator } from '~/middlewares/user.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/follow', accessTokenValidator, followValidator, wrapHandleRequest(followController))
userRouter.delete(
  '/follow/:followed_user_id',
  accessTokenValidator,
  followValidator,
  wrapHandleRequest(unfollowController)
)

userRouter.get('/me', accessTokenValidator, wrapHandleRequest(getMeController))
userRouter.get('/suggests', accessTokenValidator, wrapHandleRequest(getSuggestsController))
userRouter.get('/:username', wrapHandleRequest(getUserProfileController))

export default userRouter
