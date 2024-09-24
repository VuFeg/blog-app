import { ObjectId } from 'mongodb'
import { NotificationType } from '~/constants/enum'

type NotificationsType = {
  _id?: ObjectId
  to: ObjectId
  from: ObjectId
  type: NotificationType
  read: boolean
  created_at?: Date
  updated_at?: Date
}

export class Notification {
  _id?: ObjectId
  to: ObjectId
  from: ObjectId
  type: NotificationType
  read: boolean
  created_at: Date
  updated_at: Date

  constructor(notification: NotificationsType) {
    const date = new Date()
    this._id = notification._id
    this.to = notification.to
    this.from = notification.from
    this.type = notification.type
    this.read = notification.read
    this.created_at = notification.created_at || date
    this.updated_at = notification.updated_at || date
  }
}
