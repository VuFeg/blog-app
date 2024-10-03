import { Router } from 'express'
import {
  commentPostController,
  createPostController,
  deletePostController,
  getCommentsPostController,
  getNewFeedsController,
  getNewFeedsUserController,
  getPostController,
  likePostController
} from '~/controllers/post.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import {
  commentPostValidator,
  createPostValidator,
  deletePostValidator,
  paginationValidator
} from '~/middlewares/post.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const postRouter = Router()

postRouter.get('/new-feeds', paginationValidator, accessTokenValidator, wrapHandleRequest(getNewFeedsController))
postRouter.get(
  '/new-feeds/:username',
  paginationValidator,
  accessTokenValidator,
  wrapHandleRequest(getNewFeedsUserController)
)
postRouter.get('/comments/:post_id', accessTokenValidator, wrapHandleRequest(getCommentsPostController))
postRouter.get('/:post_id', accessTokenValidator, wrapHandleRequest(getPostController))

postRouter.post('/', accessTokenValidator, createPostValidator, wrapHandleRequest(createPostController))
postRouter.post('/like/:post_id', accessTokenValidator, wrapHandleRequest(likePostController))
postRouter.post(
  '/comment/:post_id',
  accessTokenValidator,
  commentPostValidator,
  wrapHandleRequest(commentPostController)
)

postRouter.delete('/:post_id', accessTokenValidator, deletePostValidator, wrapHandleRequest(deletePostController))

export default postRouter
