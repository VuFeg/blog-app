export type UserType = {
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

  followers: UserType[];
  followings: UserType[];
};
