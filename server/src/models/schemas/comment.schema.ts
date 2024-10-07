import { ObjectId } from 'mongodb'

type CommentType = {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  content: string
  image?: string
  created_at?: Date
}

export class Comment {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  content: string
  image?: string
  created_at: Date

  constructor(comment: CommentType) {
    this._id = comment._id
    this.user_id = comment.user_id
    this.post_id = comment.post_id
    this.content = comment.content
    this.image = comment.image
    this.created_at = comment.created_at || new Date()
  }
}
