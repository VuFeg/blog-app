import { ObjectId } from 'mongodb'
import database from './database.services'
import { Follower } from '~/models/schemas/follower.schema'
import { USER_MESSAGES } from '~/constants/message'
import { User } from '~/models/schemas/user.schema'
import { ErrorWithStatus } from '~/models/errors'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { UpdateUserProfileBodyReq } from '~/models/requests/user.request'
import { Notification } from '~/models/schemas/notification.schema'
import { NotificationType } from '~/constants/enum'

class UserServices {
  async getMe(userId: string) {
    const user = await database.users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0, forgot_password_token: 0 } }
    )
    return user
  }
  async follow(user_id: string, followed_user_id: string) {
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
    await database.followers.insertOne(
      new Follower({ user_id: new ObjectId(user_id), followed_user_id: new ObjectId(followed_user_id) })
    )
    await database.notifications.insertOne(
      new Notification({
        to: new ObjectId(followed_user_id),
        from: new ObjectId(user_id),
        type: NotificationType.Follow,
        read: false
      })
    )
    return { message: USER_MESSAGES.FOLLOW_SUCCESS }
  }
  async getSuggests(user_id: string) {
    const user_id_obj = new ObjectId(user_id)
    const follower = await database.followers
      .find({ user_id: user_id_obj }, { projection: { followed_user_id: 1, _id: 0 } })
      .toArray()

    const followed_user_ids = follower.map((item) => item.followed_user_id)
    followed_user_ids.push(user_id_obj)

    const users = await database.users
      .aggregate<User>([
        { $match: { _id: { $nin: followed_user_ids } } },
        { $sample: { size: 5 } },
        { $project: { password: 0, forgot_password_token: 0 } }
      ])
      .toArray()

    const usersWithFollowInfo = await Promise.all(
      users.map(async (user) => {
        const followers = user._id ? await this.getFollowers(user._id.toString()) : []
        const followings = user._id ? await this.getFollowings(user._id.toString()) : []
        return { ...user, followers, followings }
      })
    )

    return usersWithFollowInfo
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
  async getFollowers(user_id: string) {
    const user_followers = await database.followers.find({ followed_user_id: new ObjectId(user_id) }).toArray()
    const followers = await database.users
      .find(
        { _id: { $in: user_followers.map((item) => item.user_id) } },
        { projection: { password: 0, forgot_password_token: 0, verify_status: 0 } }
      )
      .toArray()

    return followers
  }
  async getFollowings(user_id: string) {
    const user_followings = await database.followers.find({ user_id: new ObjectId(user_id) }).toArray()
    const followings = await database.users
      .find(
        { _id: { $in: user_followings.map((item) => item.followed_user_id) } },
        { projection: { password: 0, forgot_password_token: 0, verify_status: 0 } }
      )
      .toArray()

    return followings
  }
  async updateUserProfile(user_id: string, body: UpdateUserProfileBodyReq) {
    const result = await database.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: body },
      { returnDocument: 'after' }
    )

    return result
  }
  async searchUser(keyword: string) {
    const users = await database.users
      .find(
        {
          $or: [{ username: { $regex: keyword, $options: 'i' } }, { name: { $regex: keyword, $options: 'i' } }]
        },
        { projection: { password: 0, forgot_password_token: 0 } }
      )
      .toArray()

    const usersWithFollowInfo = await Promise.all(
      users.map(async (user) => {
        const followers = await this.getFollowers(user._id.toString())
        const followings = await this.getFollowings(user._id.toString())
        return { ...user, followers, followings }
      })
    )

    return usersWithFollowInfo
  }
}

const userServices = new UserServices()
export default userServices
