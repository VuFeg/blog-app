import { ObjectId } from 'mongodb'
import database from './database.services'
import { Follower } from '~/models/schemas/follower.schema'
import { USER_MESSAGES } from '~/constants/message'
import { User } from '~/models/schemas/user.schema'
import { ErrorWithStatus } from '~/models/errors'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'

class UserServices {
  async getMe(userId: string) {
    const user = await database.users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0, forgot_password_token: 0 } }
    )
    return user
  }
  async follow(user_id: string, followed_user_id: string) {
    const follower = await database.users.findOne({
      _id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })

    if (!follower) {
      await database.followers.insertOne(
        new Follower({ user_id: new ObjectId(user_id), followed_user_id: new ObjectId(followed_user_id) })
      )
      return { message: USER_MESSAGES.FOLLOW_SUCCESS }
    }
    return { message: USER_MESSAGES.FOLLOWED }
  }
  async unfollow(user_id: string, followed_user_id: string) {
    const follower = await database.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })

    if (follower) {
      await database.followers.deleteOne({
        user_id: new ObjectId(user_id),
        followed_user_id: new ObjectId(followed_user_id)
      })
      return { message: USER_MESSAGES.UNFOLLOW_SUCCESS }
    }
    return { message: USER_MESSAGES.ALREADY_UNFOLLOWED }
  }
  async getSuggests(user_id: string) {
    const user_id_obj = new ObjectId(user_id)
    const follower = await database.followers
      .find({ user_id: user_id_obj }, { projection: { followed_user_id: 1, _id: 0 } })
      .toArray()

    const followed_user_ids = follower.map((item) => item.followed_user_id)
    followed_user_ids.push(user_id_obj)

    const user = await database.users
      .aggregate<User>([
        { $match: { _id: { $nin: followed_user_ids } } },
        { $sample: { size: 5 } },
        { $project: { password: 0, forgot_password_token: 0 } }
      ])
      .toArray()

    return user
  }
  async getUserProfile(username: string) {
    const user = await database.users.findOne(
      { username: username },
      { projection: { password: 0, forgot_password_token: 0 } }
    )

    if (!user) {
      throw new ErrorWithStatus({
        message: USER_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    return user
  }
}

const userServices = new UserServices()
export default userServices
