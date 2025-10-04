import axios from 'axios';
import { useEffect, useState } from 'react';
import useError from '@/hooks/useError';

/**
 * 공통 데이터 fetching 훅입니다.
 * 데이터를 가져오는 비동기 함수와, useEffect 의존성 배열을 인자로 받습니다.
 * @param {function(): Promise<any>} fetcher - 데이터를 가져오는 async 함수
 * @param {Array} deps - useEffect 의존성 배열
 */
const useDataFetch = (fetcher, deps = []) => {
  const { setError } = useError();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setData(null);
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await fetcher(controller.signal);
        setData(result);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') {
          return;
        }

        setError({
          status: err.response?.status || 500,
          message:
            err.response?.data?.message || '데이터를 불러오는 데 실패했습니다.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, setData, loading };
};

export default useDataFetch;
