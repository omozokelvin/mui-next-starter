'use client';
import {
  getProfileApi,
  logoutApi,
  signInApi,
  signUpApi,
} from '@/app/_common/_apis/authentication';
import { HttpErrorResponse } from '@/app/_common/_types/ApiResponse';
import {
  clearAuthDataFromStorage,
  isValidToken,
  refreshToken,
  setRefreshTimeout,
  setRefreshToken,
  setSession,
} from '@/app/_common/constants/jwt';
import { ROUTES } from '@/app/_common/constants/routes';
import { useRouter } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { AuthSuccess, CreateProfile, Profile } from '../_types/Authentication';

export type AuthContextState = {
  isLoggedIn: boolean;
  profile: Profile | null;
  login: (
    email: string,
    password: string,
    successCallback?: (authResponse: AuthSuccess) => void
  ) => void;
  logout: () => void;
  signup: (
    payload: CreateProfile,
    successCallback?: (authResponse: AuthSuccess) => void
  ) => void;
  isSuperAdmin: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  profile: null,
  login: () => undefined,
  logout: () => undefined,
  signup: () => undefined,
  isSuperAdmin: false,
  isAdmin: false,
});

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const router = useRouter();

  const isAdmin = useMemo(
    () =>
      profile?.roles?.some((role) => role?.operations?.includes('ADMIN')) ||
      false,
    [profile?.roles]
  );

  const isSuperAdmin = useMemo(
    () =>
      profile?.roles?.some((role) =>
        role?.operations?.includes('SUPER_ADMIN')
      ) || false,
    [profile?.roles]
  );

  const doLoginActions = (
    data: AuthSuccess,
    successCallBack?: (authSuccess: AuthSuccess) => void
  ) => {
    const { user, payload } = data;
    const { accessToken, refreshToken, expiresIn } = payload;

    const parsedExpiresIn = +expiresIn.replace('ms', '');

    setSession(accessToken);
    setRefreshToken(refreshToken);
    setRefreshTimeout(parsedExpiresIn);

    setRefreshTimeout();

    setProfile(user);

    toast.success('Logged in successfully!');

    if (!successCallBack) {
      // this logic needs to change visit admin
      router.replace(ROUTES.admin);
      return;
    }

    successCallBack(data);
  };

  const loginHandler = async (
    email: string,
    password: string,
    successCallBack?: (authSuccess: AuthSuccess) => void
  ) => {
    try {
      const { data } = await signInApi(email, password);

      doLoginActions(data, successCallBack);
    } catch (error) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          'Failed to log you in, please try again later or contact admin'
      );
    }
  };

  const signupHandler = async (
    payload: CreateProfile,
    successCallBack?: (authSuccess: AuthSuccess) => void
  ) => {
    try {
      const { data } = await signUpApi(payload);

      doLoginActions(data, successCallBack);
    } catch (error) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          'Failed to create your account, please try again later or contact admin'
      );
    }
  };

  const doLogoutActions = useCallback(() => {
    setSession(null);
    setRefreshToken(null);
    setProfile(null);

    clearAuthDataFromStorage();
  }, []);

  const logoutHandler = () => {
    logoutApi().then().catch();

    doLogoutActions();

    router.replace(ROUTES.login);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error();
        }

        const isTokenValid = isValidToken(accessToken);

        if (!isTokenValid) {
          throw new Error();
        }

        setSession(accessToken);

        const { data } = await getProfileApi();

        setProfile(data);

        refreshToken();
      } catch (err) {
        doLogoutActions();
      }
    };

    const timeout = setTimeout(() => {
      initialize();
    }, 50);

    return () => timeout && clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    isLoggedIn: !!profile,
    profile: profile,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
    isAdmin,
    isSuperAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
