import { httpService } from '@/app/_common/_apis/httpService';
import { HttpSuccessResponse } from '@/app/_common/_types/ApiResponse';
import {
  ApiRoute,
  AuthSuccess,
  CreateProfile,
  Profile,
  Role,
  RolePayload,
  SendOtp,
  VerifyOtp,
} from '@/app/_common/_types/Authentication';

export const sendOtpApi = async ({
  type,
  ...rest
}: SendOtp): Promise<HttpSuccessResponse> => {
  return httpService.post('otp/send/' + type, { ...rest });
};

export const verifyOtpApi = async ({
  type,
  ...rest
}: VerifyOtp): Promise<HttpSuccessResponse> => {
  return httpService.patch('otp/verify/' + type, { ...rest });
};

export const signUpApi = async (
  payload: CreateProfile
): Promise<HttpSuccessResponse<AuthSuccess>> => {
  return httpService.post('auth/register', payload);
};

export const signInApi = async (
  email: Profile['email'],
  password: string
): Promise<HttpSuccessResponse<AuthSuccess>> => {
  return httpService.post('auth/login', { email, password });
};

export const refreshTokenApi = async (
  refreshToken: string
): Promise<HttpSuccessResponse<Pick<AuthSuccess, 'payload'>>> => {
  return httpService.post('auth/refresh', { refreshToken });
};

export const getProfileApi = async (): Promise<
  HttpSuccessResponse<Profile>
> => {
  return httpService.get('auth/me');
};

export const logoutApi = async (): Promise<HttpSuccessResponse> => {
  return httpService.patch('auth/logout');
};

// ROLE MANAGEMENT

export const createRoleApi = async (
  body: RolePayload
): Promise<HttpSuccessResponse<Role>> => {
  return httpService.post(`roles`, body);
};

export const updateRoleApi = async (
  id: Role['id'],
  body: RolePayload
): Promise<HttpSuccessResponse<Role>> => {
  return httpService.patch(`roles/${id}`, body);
};

export const getRolesApi = async (): Promise<HttpSuccessResponse<Role[]>> => {
  return httpService.get(`roles`);
};

export const getApiRoutes = async (): Promise<
  HttpSuccessResponse<ApiRoute[]>
> => {
  return httpService.get(`roles/routes`);
};

export const getRoleApi = async (
  id: Role['id']
): Promise<HttpSuccessResponse<Role>> => {
  return httpService.get(`roles/${id}`);
};
