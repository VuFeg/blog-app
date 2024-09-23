import { MediaType } from '~/constants/common'

export interface CreatePostBodyReq {
  captions?: string
  hashtags?: string[]
  medias: MediaType[]
  mentions?: string[]
}

export interface GetNewFeedsReqQuery {
  page: string
  limit: string
}

export interface DeletePostBodyReq {
  post_id: string
}
