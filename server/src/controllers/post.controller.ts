import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { POST_MESSAGES } from '~/constants/message'
import { CreatePostBodyReq, DeletePostBodyReq, GetNewFeedsReqQuery } from '~/models/requests/post.request'
import { ParamsDictionary } from 'express-serve-static-core'
import postServices from '~/services/post.services'

export const createPostController = async (
  req: Request<ParamsDictionary, any, CreatePostBodyReq>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const body = req.body
  const result = await postServices.createPost(user_id, body)

  return res.status(HTTP_STATUS_CODE.CREATED).json({ message: POST_MESSAGES.CREATE_POST_SUCCESSFULLY, result })
}

export const getNewFeedsController = async (
  req: Request<ParamsDictionary, any, any, GetNewFeedsReqQuery>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const result = await postServices.getNewFeeds(user_id, page, limit)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: POST_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: result.posts,
    limit,
    page,
    totalPage: Math.ceil(result.total / limit)
  })
}

export const getNewFeedsUserController = async (
  req: Request<ParamsDictionary, any, any, GetNewFeedsReqQuery>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const { username } = req.params
  const result = await postServices.getNewFeedsUser(user_id, page, limit, username)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: POST_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: result.posts,
    limit,
    page,
    totalPage: Math.ceil(result.total / limit)
  })
}

export const deletePostController = async (
  req: Request<ParamsDictionary, any, any, DeletePostBodyReq>,
  res: Response,
  next: NextFunction
) => {
  const { post_id } = req.params
  await postServices.deletePost(post_id)

  return res.status(HTTP_STATUS_CODE.OK).json({ message: 'Delete post successfully.' })
}

export const likePostController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const { post_id } = req.params
  const result = await postServices.likePost(user_id, post_id)

  return res.status(HTTP_STATUS_CODE.OK).json(result)
}
