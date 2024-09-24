import { ObjectId } from 'mongodb'

type NotificationType = {
  _id?: ObjectId
  user_id: ObjectId
  following_user_id: ObjectId
  message: string
  read: boolean
  created_at?: Date
  updated_at?: Date
}

export class Notification {
  _id?: ObjectId
  user_id: ObjectId
  following_user_id: ObjectId
  message: string
  read: boolean
  created_at: Date
  updated_at: Date

  constructor(notification: NotificationType) {
    const date = new Date()
    this._id = notification._id
    this.user_id = notification.user_id
    this.following_user_id = notification.following_user_id
    this.message = notification.message
    this.read = notification.read
    this.created_at = notification.created_at || date
    this.updated_at = notification.updated_at || date
  }
}
