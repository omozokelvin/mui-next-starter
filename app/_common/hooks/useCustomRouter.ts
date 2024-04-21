'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export type QueryParamValue = string | boolean | number | null;

export enum QueryParamEnum {
  showModal = 'showModal',
  search = 'search',
  id = 'id',
  isVerified = 'isVerified',
  showCropDialog = 'showCropDialog',
}

export function useCustomRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const params = useParams();

  const urlParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const getQueryParam = useCallback(
    (key: QueryParamEnum) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const setUrlParams = useCallback(
    (key: QueryParamEnum, value?: QueryParamValue) => {
      !!value || value === 0 || value === false
        ? urlParams.set(key, value.toString())
        : urlParams.delete(key);
    },
    [urlParams]
  );

  const setQueryParam = useCallback(
    (key: QueryParamEnum, value?: QueryParamValue) => {
      setUrlParams(key, value);

      router.push(pathname + `?${urlParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, urlParams, setUrlParams]
  );

  const setQueryParams = useCallback(
    (params: Partial<Record<QueryParamEnum, QueryParamValue>>) => {
      for (const [key, value] of Object.entries(params)) {
        setUrlParams(key as QueryParamEnum, value);
      }

      router.push(pathname + `?${urlParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, urlParams, setUrlParams]
  );

  const routeWithQueryParams = useCallback(
    (
      href: string,
      params: Partial<Record<QueryParamEnum, QueryParamValue>>
    ) => {
      for (const [key, value] of Object.entries(params)) {
        setUrlParams(key as QueryParamEnum, value);
      }

      router.push(href + `?${urlParams.toString()}`);
    },
    [router, urlParams, setUrlParams]
  );

  return {
    getQueryParam,
    setQueryParam,
    pathname,
    router,
    searchParams,
    setQueryParams,
    routeWithQueryParams,
    urlParams,
  };
}
