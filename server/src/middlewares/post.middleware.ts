import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { MediaType } from '~/constants/common'
import { Media } from '~/constants/enum'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { POST_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors'
import { numberEnumToArray } from '~/utils/common'
import { validate } from '~/utils/validation'

const medias = numberEnumToArray(Media)

export const createPostValidator = validate(
  checkSchema(
    {
      captions: {
        trim: true,
        optional: true,
        isString: {
          errorMessage: POST_MESSAGES.CAPTIONS_MUST_BE_A_STRING
        }
      },
      hashtags: {
        optional: true,
        isArray: true,
        custom: {
          options: (value, { req }) => {
            if ((value as string[]).some((item) => typeof item !== 'string')) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: POST_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING
              })
            }
            return true
          }
        }
      },
      mentions: {
        optional: true,
        isArray: true,
        custom: {
          options: (value, { req }) => {
            if ((value as string[]).some((item) => !ObjectId.isValid(item))) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: POST_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID
              })
            }
            return true
          }
        }
      },
      medias: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            if (
              (value as MediaType[]).length === 0 ||
              (value as MediaType[]).some((item) => typeof item.url !== 'string' || !medias.includes(item.type))
            ) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: POST_MESSAGES.MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT
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

export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const limit = Number(value)
            if (limit > 100 || limit < 0) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: '0 <= limit <= 100'
              })
            }
            return true
          }
        }
      },
      page: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const page = Number(value)
            if (page <= 0) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: 'page > 0'
              })
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
