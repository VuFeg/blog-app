export type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  forgot_password_token: string;
  verify_status: boolean;
  account_type: boolean;

  created_at: Date;
  updated_at: Date;

  gender: string;
  day_of_birth: string;
  bio: string;
  website: string;
  avatar: string;
};

export type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  forgot_password_token: string;
  verify_status: boolean;
  account_type: boolean;

  created_at: Date;
  updated_at: Date;

  gender: string;
  day_of_birth: string;
  bio: string;
  website: string;
  avatar: string;

  followers: [User];
  followings: [User];
};

export type UpdateUserReqBody = {
  name?: string;
  bio?: string;
  website?: string;
  gender?: string;
  day_of_birth?: string;
  avatar?: string;
};
