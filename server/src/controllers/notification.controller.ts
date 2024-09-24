import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import notificationServices from '~/services/notification.services'

export const getNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const result = await notificationServices.getNotifications(user_id)
  return res.status(HTTP_STATUS_CODE.OK).json({
    message: 'Get notifications successfully',
    result
  })
}

export const deleteNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  const notification_id = req.params.notification_id
  const result = await notificationServices.deleteNotification(notification_id)
  return res.status(HTTP_STATUS_CODE.OK).json(result)
}
