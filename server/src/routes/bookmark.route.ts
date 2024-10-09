import { Router } from 'express'
import { bookmarkPostController, getBookmarksPostController } from '~/controllers/post.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const bookmarkRouter = Router()

bookmarkRouter.get('/', accessTokenValidator, wrapHandleRequest(getBookmarksPostController))
bookmarkRouter.post('/:post_id', accessTokenValidator, wrapHandleRequest(bookmarkPostController))

export default bookmarkRouter
