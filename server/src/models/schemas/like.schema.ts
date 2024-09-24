import { ObjectId } from 'mongodb'

type LikeType = {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  created_at?: Date
  updated_at?: Date
}

export class Like {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  created_at: Date
  updated_at: Date

  constructor(like: LikeType) {
    const date = new Date()
    this._id = like._id
    this.user_id = like.user_id
    this.post_id = like.post_id
    this.created_at = like.created_at || date
    this.updated_at = like.updated_at || date
  }
}
