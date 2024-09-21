import { ObjectId } from 'mongodb'
import { UserAccountType, UserVerifyStatus } from '~/constants/enum'

export type UserType = {
  _id?: ObjectId
  name: string
  username: string
  email: string
  password: string
  forgot_password_token?: string
  verify_status?: UserVerifyStatus
  account_type?: UserAccountType

  created_at?: Date
  updated_at?: Date

  gender?: string
  day_of_birth?: string
  bio?: string
  website?: string
  avatar?: string
}

export class User {
  _id?: ObjectId
  name: string
  username: string
  email: string
  password: string
  forgot_password_token?: string
  verify_status?: UserVerifyStatus
  account_type?: UserAccountType

  created_at: Date
  updated_at: Date

  gender?: string
  day_of_birth?: string
  bio?: string
  website?: string
  avatar?: string

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.username = user.username
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify_status = user.verify_status || UserVerifyStatus.Unverified
    this.account_type = user.account_type || UserAccountType.PUBLIC
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.gender = user.gender || ''
    this.day_of_birth = user.day_of_birth || ''
    this.bio = user.bio || ''
    this.website = user.website || ''
    this.avatar = user.avatar || ''
  }
}
