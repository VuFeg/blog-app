import { ObjectId } from 'mongodb'
import database from './database.services'

class NotificationServices {
  async getNotifications(user_id: string) {
    const user_id_obj = new ObjectId(user_id)

    const notifications = await database.notifications
      .aggregate([
        {
          $match: {
            to: user_id_obj
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'from',
            foreignField: '_id',
            as: 'from'
          }
        },
        {
          $unwind: '$from'
        },
        {
          $project: {
            'from.password': 0,
            'from.forgot_password_token': 0
          }
        },
        {
          $sort: { created_at: -1 }
        }
      ])
      .toArray()

    return notifications
  }
  async deleteNotification(notification_id: string) {
    const notification_id_obj = new ObjectId(notification_id)

    await database.notifications.deleteOne({ _id: notification_id_obj })
    const result = {
      message: 'Delete notification successfully'
    }

    return result
  }
}

const notificationServices = new NotificationServices()
export default notificationServices
