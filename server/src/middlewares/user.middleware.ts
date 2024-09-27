import { Request } from 'express'
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

export const updateUserProfileValidator = validate(
  checkSchema(
    {
      name: {
        trim: true,
        notEmpty: {
          errorMessage: USER_MESSAGES.NAME_IS_REQUIRED
        },
        isLength: {
          errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
          options: { min: 1, max: 100 }
        }
      },
      bio: {
        trim: true,
        isLength: {
          errorMessage: USER_MESSAGES.BIO_LENGTH,
          options: { min: 0, max: 200 }
        }
      },
      website: {
        trim: true,
        isLength: {
          errorMessage: USER_MESSAGES.WEBSITE_LENGTH,
          options: { min: 0, max: 200 }
        },
        isURL: {
          errorMessage: 'Invalid URL'
        }
      },
      day_of_birth: {
        isDate: {
          errorMessage: 'Invalid date'
        },
        custom: {
          options: (value) => {
            if (new Date(value) > new Date()) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: 'Date of birth must be less than or equal to the current date'
              })
            }
            return true
          }
        }
      },
      gender: {
        trim: true,
        custom: {
          options: (value: string) => {
            if (!['male', 'female', 'other'].includes(value.toLowerCase())) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: 'Invalid gender'
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const searchUserValidator = validate(
  checkSchema(
    {
      keyword: {
        trim: true,
        notEmpty: {
          errorMessage: 'Keyword is required'
        },
        isLength: {
          errorMessage: 'Keyword length must be from 1 to 100',
          options: { min: 1, max: 100 }
        }
      }
    },
    ['params']
  )
)
