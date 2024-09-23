import { CreatePostBodyReq } from '~/models/requests/post.request'
import database from './database.services'
import { ObjectId } from 'mongodb'
import { Post } from '~/models/schemas/post.schema'

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
    const posts = await database.posts
      .find({
        $or: [
          { user_id: new ObjectId(user_id) },
          {
            user_id: {
              $in: (await database.followers.find({ follower_id: new ObjectId(user_id) }).toArray()).map(
                (item) => item.followed_user_id
              )
            }
          }
        ]
      })
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    return posts
  }
}

const postServices = new PostServices()
export default postServices
