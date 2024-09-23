export interface FollowBodyRed {
  follower_user_id: string
}

export interface UserProfileParams {
  username: string
}

export interface UpdateUserProfileBodyReq {
  name: string
  bio?: string
  avatar?: string
  website?: string
  day_of_birth?: string
  gender?: string
}
