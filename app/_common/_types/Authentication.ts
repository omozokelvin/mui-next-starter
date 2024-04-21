
export interface TokenPayload {
  type: string;
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  expiresAt: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  referralCode: string;
  roles?: Pick<Role, 'id' | 'operations'>[];
  state?:string;
  academicLevel?: string;
  photo?:string
}

export interface AuthSuccess {
  user: Profile;
  payload: TokenPayload;
}

export type CreateProfile = Pick<Profile, 'firstName' | 'lastName' | 'email' | 'mobileNumber'> & {
  password: string;
  referralCode?: Profile['referralCode'];
};

export type UpdateProfile = Pick<CreateProfile, 'firstName' | 'lastName' | 'email'>;


export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}



export type SendOtp = Pick<Profile, 'email'> & {
  type: 'registration' | 'change-password';
  mobileNumber?: string;
  referralCode?: string;
};

export type VerifyOtp = SendOtp & { code: string };

export type ApiRoute = {
  path: string;
  method: 'get' | 'post' | 'patch';
};

export type Role = {
  id: string;
  name: string;
  description: string;
  operations: string[];
  apiRoutes: ApiRoute[];
};

export type RolePayload = Omit<Role, 'id'>;
