export interface CommentRequest {
  user_id: string
  post_id: string
  content: string
  image?: string
  create_at?: Date
}
