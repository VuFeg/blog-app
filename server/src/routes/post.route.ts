import { Router } from 'express'
import {
  createPostController,
  deletePostController,
  getNewFeedsController,
  getNewFeedsUserController,
  likePostController
} from '~/controllers/post.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { createPostValidator, deletePostValidator, paginationValidator } from '~/middlewares/post.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const postRouter = Router()

postRouter.get('/new-feeds', paginationValidator, accessTokenValidator, wrapHandleRequest(getNewFeedsController))
postRouter.get(
  '/new-feeds/:username',
  paginationValidator,
  accessTokenValidator,
  wrapHandleRequest(getNewFeedsUserController)
)

postRouter.post('/', accessTokenValidator, createPostValidator, wrapHandleRequest(createPostController))
postRouter.post('/like/:post_id', accessTokenValidator, wrapHandleRequest(likePostController))

postRouter.delete('/:post_id', accessTokenValidator, deletePostValidator, wrapHandleRequest(deletePostController))

export default postRouter
