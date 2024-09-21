import express from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { EntityError, ErrorWithStatus } from '~/models/errors'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()
    const entityErrors = new EntityError({ errors: {} })
    for (const key in errorsObject) {
      const msg = errorsObject[key].msg
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      entityErrors.errors[key] = errorsObject[key]
    }

    next(entityErrors)
  }
}
