import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { ErrorWithStatus } from '~/models/errors'
import database from '~/services/database.services'
import { validate } from '~/utils/validation'

export const deleteNotificationValidator = validate(
  checkSchema({
    notification_id: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: HTTP_STATUS_CODE.BAD_REQUEST,
              message: 'Notification ID is required'
            })
          }
          const user_id = req.decoded_authorization?.user_id as string
          const notification_id = new ObjectId(value)
          const notification = await database.notifications.findOne({ _id: notification_id })
          if (!notification) {
            throw new ErrorWithStatus({
              status: HTTP_STATUS_CODE.NOT_FOUND,
              message: 'Notification not found'
            })
          }
          if (notification.to.toString() !== user_id) {
            throw new ErrorWithStatus({
              status: HTTP_STATUS_CODE.FORBIDDEN,
              message: 'You are not authorized to delete this notification'
            })
          }
          return true
        }
      }
    }
  })
)
