import { ObjectId } from 'mongodb'

type FollowerType = {
  _id?: ObjectId
  user_id: ObjectId
  followed_user_id: ObjectId
  create_at?: Date
}

export class Follower {
  _id?: ObjectId
  user_id: ObjectId
  followed_user_id: ObjectId
  create_at: Date

  constructor(follower: FollowerType) {
    this._id = follower._id
    this.user_id = follower.user_id
    this.followed_user_id = follower.followed_user_id
    this.create_at = follower.create_at || new Date()
  }
}
