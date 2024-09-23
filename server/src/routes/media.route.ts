import { Router } from 'express'
import { uploadAvatarController, uploadImageController } from '~/controllers/media.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const mediaRouter = Router()

mediaRouter.post('/upload-image', accessTokenValidator, wrapHandleRequest(uploadImageController))
mediaRouter.post('/upload-avatar', accessTokenValidator, wrapHandleRequest(uploadAvatarController))

export default mediaRouter
