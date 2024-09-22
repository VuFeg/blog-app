import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { USER_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors'
import database from '~/services/database.services'
import { validate } from '~/utils/validation'

export const followValidator = validate(
  checkSchema(
    {
      followed_user_id: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: USER_MESSAGES.FOLLOWED_USER_ID_IS_REQUIRED
              })
            }
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: USER_MESSAGES.INVALID_USER_ID
              })
            }
            if (value === req.decoded_authorization?.user_id) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: USER_MESSAGES.CANNOT_FOLLOW_YOURSELF
              })
            }

            const user = await database.users.findOne({ _id: new ObjectId(value) })
            if (!user) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.NOT_FOUND,
                message: USER_MESSAGES.USER_NOT_FOUND
              })
            }
            return true
          }
        }
      }
    },
    ['body', 'params']
  )
)
