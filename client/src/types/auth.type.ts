export interface LoginReqBody {
  email: string;
  password: string;
}

export interface RegisterReqBody {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LogoutReqBody {
  refreshToken: string;
}
