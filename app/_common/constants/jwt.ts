import { refreshTokenApi } from '@/app/_common/_apis/authentication';
import { jwtDecode } from 'jwt-decode';
import { httpService } from '../_apis/httpService';

let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;

// eslint-disable-next-line no-undef
// let refreshTokenTimeout: NodeJS.Timeout | null = null;

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  const isStillValid = decoded.exp > currentTime;

  return isStillValid;
};

const setSession = (accessToken: string | null) => {
  if (!accessToken) {
    localStorage.removeItem('accessToken');
    delete httpService.defaults.headers.common.Authorization;
    return;
  }

  localStorage.setItem('accessToken', accessToken);
  httpService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const setRefreshTimeout = (interval = 60 * 60 * 1000) => {
  const tokenExpiresAt = interval + new Date().getTime();
  localStorage.setItem('tokenExpiresAt', tokenExpiresAt.toString());
  interval = interval - 120 * 1000; // 120 seconds before timeout

  refreshTokenTimeout = setTimeout(() => {
    refreshToken();
  }, interval);
};

const setRefreshToken = (refreshToken: string | null) => {
  if (!refreshToken) {
    localStorage.removeItem('refreshToken');
    return;
  }

  localStorage.setItem('refreshToken', refreshToken);
};

const refreshToken = async () => {
  const token = localStorage.getItem('refreshToken');

  if (!token) {
    return;
  }

  const { data } = await refreshTokenApi(token);

  const { accessToken, refreshToken, expiresIn } = data.payload;

  const parsedExpiresIn = +expiresIn.replace('ms', '');

  setSession(accessToken);
  setRefreshToken(refreshToken);
  setRefreshTimeout(parsedExpiresIn);
};

const clearAuthDataFromStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiresAt');
  localStorage.removeItem('refreshToken');

  refreshTokenTimeout && clearTimeout(refreshTokenTimeout);
};

export {
  clearAuthDataFromStorage,
  isValidToken,
  refreshToken,
  refreshTokenTimeout,
  setRefreshTimeout,
  setRefreshToken,
  setSession,
};
