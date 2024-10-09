import { ObjectId } from 'mongodb'

type BookmarkType = {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  created_at?: Date
}

export class Bookmark {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  created_at: Date

  constructor(bookmark: BookmarkType) {
    this._id = bookmark._id
    this.user_id = bookmark.user_id
    this.post_id = bookmark.post_id
    this.created_at = bookmark.created_at || new Date()
  }
}
