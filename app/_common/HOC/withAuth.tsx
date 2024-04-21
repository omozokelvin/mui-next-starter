'use client';
import { PageLoading } from '@/app/_common/components/PageLoading';
import { clearAuthDataFromStorage } from '@/app/_common/constants/jwt';
import { ROUTES } from '@/app/_common/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

export const withAuth = <T,>(Component: ComponentType<T>) => {
  const HocComponent = (props: T) => {
    const router = useRouter();
    const pathname = usePathname();

    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        clearAuthDataFromStorage();
        router.replace(ROUTES.login);
        return;
      }

      setChecking(false);
    }, [router, pathname]);

    return checking ? <PageLoading /> : <Component {...(props as any)} />;
  };

  return HocComponent;
};
