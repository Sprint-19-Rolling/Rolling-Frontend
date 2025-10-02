import { useCallback, useEffect } from 'react';
import { apiClient, teamClient } from '@/apis/axios';
import { useError } from '@/hooks/useError';

/**
 * Axios 인터셉터를 등록하여 API 통신 중 발생하는 에러를
 * 전역 ErrorContext에 주입하는 커스텀 훅입니다.
 */
const useAxiosInterceptor = () => {
  const { setError } = useError();

  const errorHandler = useCallback(
    (error) => {
      if (error.response) {
        setError({
          status: error.response.status,
          message:
            error.response.data?.message || '알 수 없는 오류가 발생했습니다.',
        });
      }
      return Promise.reject(error);
    },
    [setError]
  );

  useEffect(() => {
    const apiInterceptorId = apiClient.interceptors.response.use(
      (res) => res,
      errorHandler
    );

    const teamInterceptorId = teamClient.interceptors.response.use(
      (res) => res,
      errorHandler
    );

    return () => {
      apiClient.interceptors.response.eject(apiInterceptorId);
      teamClient.interceptors.response.eject(teamInterceptorId);
    };
  }, [setError, errorHandler]);
};

export default useAxiosInterceptor;
