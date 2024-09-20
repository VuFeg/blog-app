export type User = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  followers: [];
  following: [];
  profileImg: string;
  coverImg: string;
  bio: string;
  link: string;
  likedPosts: [];
  createdAt: string;
  updatedAt: string;
};
