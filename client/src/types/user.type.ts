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

  followers: [
    {
      _id: string;
      user_id: string;
      followed_user_id: string;
      created_at: Date;
      updated_at: Date;
    }
  ];
  followings: [
    {
      _id: string;
      followed_user_id: string;
      user_id: string;
      created_at: Date;
      updated_at: Date;
    }
  ];
};

export type UpdateUserReqBody = {
  name: string;
  bio: string;
  website: string;
  gender: string;
  day_of_birth: string;
};
