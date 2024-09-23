import { Router } from 'express'
import { createPostController, getNewFeedsController } from '~/controllers/post.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { createPostValidator, paginationValidator } from '~/middlewares/post.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const postRouter = Router()

postRouter.post('/', accessTokenValidator, createPostValidator, wrapHandleRequest(createPostController))
postRouter.get('/new-feeds', paginationValidator, accessTokenValidator, wrapHandleRequest(getNewFeedsController))

export default postRouter
