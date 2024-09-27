import { Router } from 'express'
import {
  followController,
  getMeController,
  getSuggestsController,
  getUserProfileController,
  searchUserController,
  updateUserProfileController
} from '~/controllers/user.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { followValidator, searchUserValidator, updateUserProfileValidator } from '~/middlewares/user.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/follow', accessTokenValidator, followValidator, wrapHandleRequest(followController))

userRouter.get('/me', accessTokenValidator, wrapHandleRequest(getMeController))
userRouter.get('/suggests', accessTokenValidator, wrapHandleRequest(getSuggestsController))
userRouter.get('/:username', wrapHandleRequest(getUserProfileController))
userRouter.get('/search/:keyword', searchUserValidator, wrapHandleRequest(searchUserController))

userRouter.put('/', accessTokenValidator, updateUserProfileValidator, wrapHandleRequest(updateUserProfileController))

export default userRouter
