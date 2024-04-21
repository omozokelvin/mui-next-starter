'use client';
import { PageLoading } from '@/app/_common/components/PageLoading';
import { clearAuthDataFromStorage } from '@/app/_common/constants/jwt';
import { ROUTES } from '@/app/_common/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

export function withoutAuth<T>(Component: ComponentType<T>) {
  const HocComponent = (props: T) => {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const runGuard = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          await router.push(ROUTES.home);
          return;
        }

        clearAuthDataFromStorage();

        setChecking(false);
      };

      runGuard();
    }, [router, pathname]);

    return checking ? <PageLoading /> : <Component {...(props as any)} />;
  };

  return HocComponent;
}
