import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { USER_MESSAGES } from '~/constants/message'
import userServices from '~/services/user.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { FollowerBodyReq } from '~/models/requests/follower.request'
import { UserProfileParams } from '~/models/requests/user.request'

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const result = await userServices.getMe(user_id)
  const followers = await userServices.getFollowers(user_id)
  const followings = await userServices.getFollowings(user_id)
  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.GET_ME_SUCCESSFULLY,
    result: { ...result, followers, followings }
  })
}

export const getSuggestsController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string

  const result = await userServices.getSuggests(user_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.GET_SUGGESTS_SUCCESSFULLY,
    result
  })
}

export const getUserProfileController = async (req: Request<UserProfileParams>, res: Response) => {
  const { username } = req.params
  const result = await userServices.getUserProfile(username)
  const followers = await userServices.getFollowers(username)
  const followings = await userServices.getFollowings(username)

  return res.status(HTTP_STATUS_CODE.OK).json({ result: { ...result, followers, followings } })
}

export const followController = async (
  req: Request<ParamsDictionary, any, FollowerBodyReq>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const followed_user_id = req.body.followed_user_id

  const result = await userServices.follow(user_id, followed_user_id)

  return res.status(HTTP_STATUS_CODE.OK).json(result)
}

export const unfollowController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const followed_user_id = req.params.followed_user_id

  const result = await userServices.unfollow(user_id, followed_user_id)

  return res.status(HTTP_STATUS_CODE.OK).json(result)
}
