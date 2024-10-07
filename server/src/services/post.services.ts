import { CreatePostBodyReq } from '~/models/requests/post.request'
import database from './database.services'
import { ObjectId } from 'mongodb'
import { Post } from '~/models/schemas/post.schema'
import { Notification } from '~/models/schemas/notification.schema'
import { NotificationType } from '~/constants/enum'
import { Like } from '~/models/schemas/like.schema'

class PostServices {
  async createPost(user_id: string, body: CreatePostBodyReq) {
    const post = await database.posts.insertOne(
      new Post({
        user_id: new ObjectId(user_id),
        captions: body.captions,
        hashtags: body.hashtags,
        mentions: body.mentions,
        medias: body.medias
      })
    )
    return post
  }
  async getNewFeeds(user_id: string, page: number, limit: number) {
    const user_id_obj = new ObjectId(user_id)
    const follower = await database.followers
      .find({ user_id: user_id_obj }, { projection: { followed_user_id: 1, _id: 0 } })
      .toArray()

    const followed_user_ids = follower.map((item) => item.followed_user_id)
    followed_user_ids.push(user_id_obj)

    const [posts, total] = await Promise.all([
      database.posts
        .aggregate<Post>([
          {
            $match: { user_id: { $in: followed_user_ids } }
          },
          { $sort: { created_at: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $lookup: {
              from: 'bookmarks',
              localField: '_id',
              foreignField: 'post_id',
              as: 'bookmark'
            }
          },
          {
            $lookup: {
              from: 'likes',
              localField: '_id',
              foreignField: 'post_id',
              as: 'like'
            }
          },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'post_id',
              as: 'comments'
            }
          },
          {
            $addFields: {
              user: {
                $map: {
                  input: '$user',
                  as: 'item',
                  in: {
                    _id: '$$item._id',
                    name: '$$item.name',
                    username: '$$item.username',
                    email: '$$item.email',
                    avatar: '$$item.avatar'
                  }
                }
              },
              bookmarks: {
                $filter: {
                  input: '$bookmarks',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.user_id', user_id_obj]
                  }
                }
              }
            }
          },
          {
            $unwind: {
              path: '$user'
            }
          },

          {
            $project: {
              user_id: 0
            }
          }
        ])
        .toArray(),

      database.posts.countDocuments({
        user_id: {
          $in: followed_user_ids
        }
      })
    ])

    return { posts, total }
  }
  async getNewFeedsUser(user_id: string, page: number, limit: number, username: string) {
    const user = await database.users.findOne({ username })
    if (!user) {
      throw new Error('User not found')
    }

    const [posts, total] = await Promise.all([
      database.posts
        .aggregate<Post>([
          {
            $match: { user_id: user._id }
          },
          { $sort: { created_at: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $lookup: {
              from: 'bookmarks',
              localField: '_id',
              foreignField: 'post_id',
              as: 'bookmark'
            }
          },
          {
            $lookup: {
              from: 'likes',
              localField: '_id',
              foreignField: 'post_id',
              as: 'like'
            }
          },
          {
            $addFields: {
              user: {
                $map: {
                  input: '$user',
                  as: 'item',
                  in: {
                    _id: '$$item._id',
                    name: '$$item.name',
                    username: '$$item.username',
                    email: '$$item.email',
                    avatar: '$$item.avatar'
                  }
                }
              },
              bookmarks: {
                $filter: {
                  input: '$bookmarks',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.user_id', new ObjectId(user_id)]
                  }
                }
              }
            }
          },
          {
            $unwind: { path: '$user' }
          },
          {
            $project: {
              user_id: 0,
              'user.password': 0,
              'user.forgot_password_token': 0
            }
          }
        ])
        .toArray(),

      database.posts.countDocuments({ user_id: user._id })
    ])
    return { posts, total }
  }
  async deletePost(post_id: string) {
    await database.posts.deleteOne({ _id: new ObjectId(post_id) })
    await database.likes.deleteMany({ post_id: new ObjectId(post_id) })
  }
  async likePost(user_id: string, post_id: string) {
    const post_id_obj = new ObjectId(post_id)
    const user_id_obj = new ObjectId(user_id)
    const isLiked = await database.likes.findOne({ user_id: user_id_obj, post_id: post_id_obj })
    if (!isLiked) {
      await database.likes.insertOne(new Like({ user_id: user_id_obj, post_id: post_id_obj }))
      const post = await database.posts.findOne({ _id: post_id_obj })
      if (user_id !== post?.user_id.toString())
        await database.notifications.insertOne(
          new Notification({
            to: new ObjectId(post?.user_id),
            from: user_id_obj,
            type: NotificationType.Like,
            read: false
          })
        )
      return { message: 'Like post successfully' }
    }

    await database.likes.deleteOne({ user_id: user_id_obj, post_id: post_id_obj })
    return { message: 'Unlike post successfully' }
  }
  async commentPost(user_id: string, post_id: string, content: string) {
    const post_id_obj = new ObjectId(post_id)
    const user_id_obj = new ObjectId(user_id)
    await database.comments.insertOne({
      user_id: user_id_obj,
      post_id: post_id_obj,
      content,
      created_at: new Date()
    })
    const post = await database.posts.findOne({ _id: post_id_obj })
    if (user_id !== post?.user_id.toString())
      await database.notifications.insertOne(
        new Notification({
          to: new ObjectId(post?.user_id),
          from: user_id_obj,
          type: NotificationType.Comment,
          read: false
        })
      )
    return { message: 'Comment post successfully' }
  }
  async getCommentsPost(post_id: string) {
    const comments = await database.comments
      .aggregate([
        {
          $match: { post_id: new ObjectId(post_id) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: { path: '$user' }
        },
        {
          $project: {
            user_id: 0,
            'user.password': 0,
            'user.forgot_password_token': 0
          }
        },
        { $sort: { created_at: -1 } }
      ])
      .toArray()

    return comments
  }
  async getPost(post_id: string) {
    const post = await database.posts
      .aggregate([
        {
          $match: { _id: new ObjectId(post_id) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: { path: '$user' }
        },
        {
          $lookup: {
            from: 'bookmarks',
            localField: '_id',
            foreignField: 'post_id',
            as: 'bookmark'
          }
        },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'post_id',
            as: 'like'
          }
        },
        {
          $addFields: {
            bookmarks: {
              $filter: {
                input: '$bookmark',
                as: 'item',
                cond: {
                  $eq: ['$$item.user_id', new ObjectId(post_id)]
                }
              }
            }
          }
        },
        {
          $project: {
            user_id: 0
          }
        }
      ])
      .toArray()

    return post[0]
  }
}

const postServices = new PostServices()
export default postServices
