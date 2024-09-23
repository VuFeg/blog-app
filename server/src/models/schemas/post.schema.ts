import { ObjectId } from 'mongodb'
import { MediaType } from '~/constants/common'

type PostType = {
  _id?: ObjectId
  user_id: ObjectId
  captions?: string
  hashtags?: string[]
  medias: MediaType[]
  mentions?: string[]
  comments?: ObjectId[]

  created_at?: Date
  updated_at?: Date
}

export class Post {
  _id?: ObjectId
  user_id: ObjectId
  captions?: string
  hashtags?: string[]
  medias: MediaType[]
  mentions?: string[]
  comments?: ObjectId[]

  created_at: Date
  updated_at: Date

  constructor(post: PostType) {
    const date = new Date()
    this._id = post._id
    this.user_id = post.user_id
    this.captions = post.captions || ''
    this.hashtags = post.hashtags || []
    this.medias = post.medias || []
    this.mentions = post.mentions || []
    this.comments = post.comments || []
    this.created_at = post.created_at || date
    this.updated_at = post.updated_at || date
  }
}
