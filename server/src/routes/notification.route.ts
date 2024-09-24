import { Router } from 'express'
import { deleteNotificationController, getNotificationController } from '~/controllers/notification.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { deleteNotificationValidator } from '~/middlewares/notification.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const notificationRouter = Router()

notificationRouter.get('/', accessTokenValidator, wrapHandleRequest(getNotificationController))
notificationRouter.delete(
  '/:notification_id',
  accessTokenValidator,
  deleteNotificationValidator,
  wrapHandleRequest(deleteNotificationController)
)

export default notificationRouter
