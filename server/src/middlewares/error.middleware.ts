import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { ErrorWithStatus } from '~/models/errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
  }

  Object.getOwnPropertyNames(err).forEach((name) => {
    if (
      !Object.getOwnPropertyDescriptor(err, name)?.configurable ||
      !Object.getOwnPropertyDescriptor(err, name)?.writable
    ) {
      return
    }
    Object.defineProperty(err, name, { enumerable: true })
  })

  res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
}
