import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { USER_MESSAGES } from '~/constants/message'
import mediaServices from '~/services/media.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediaServices.uploadImage(req)
  res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY,
    result
  })
}

export const uploadAvatarController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediaServices.uploadAvatar(req)
  res.status(HTTP_STATUS_CODE.OK).json({
    message: 'Upload avatar successfully',
    result: result[0].url
  })
}
