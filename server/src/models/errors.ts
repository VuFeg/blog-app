import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'

type ErrorType = Record<
  string,
  {
    msg: string
    [p: string]: any
  }
>

export class ErrorWithStatus {
  message: string
  status: number

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorType

  constructor({
    message = 'Entity error',
    status = HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY,
    errors
  }: {
    message?: string
    status?: number
    errors: ErrorType
  }) {
    super({ message, status })
    this.errors = errors
  }
}
