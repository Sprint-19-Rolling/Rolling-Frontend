import { useCallback } from 'react';
import { getRollingPaperData } from '@/apis/recipients';
import { LIST_LIMIT } from '@/constants/list';
import useDataFetch from '@/hooks/useDataFetch';
import useError from '@/hooks/useError';

/**
 * 롤링페이퍼 데이터를 가져오는 커스텀 훅
 * - 정렬 기준(sort)과 페이지네이션 URL에 따라 데이터를 가져옵니다.
 * - 다음/이전 페이지 이동 함수를 함께 제공합니다.
 *
 * @param {string} [sort] - 정렬 기준 ('like' 또는 undefined)
 * @returns {{
 *   data: Object | null,
 *   loading: boolean,
 *   goNext: () => void,
 *   goPrev: () => void
 * }}
 */
const useRollingPaperData = (sort) => {
  const { setError } = useError();

  const fetcher = async (signal) =>
    getRollingPaperData(
      { limit: LIST_LIMIT, sort: sort === 'like' ? 'like' : null },
      signal
    );

  const { data, setData, loading } = useDataFetch(fetcher, [sort]);

  const fetchPage = useCallback(
    async (url) => {
      if (!url) {
        return;
      }
      try {
        const result = await getRollingPaperData({ url });
        setData(result);
      } catch (err) {
        setError({
          status: err.response?.status || 500,
          message:
            err.response?.data?.message ||
            '페이지 데이터를 불러오는 데 실패했습니다.',
        });
      }
    },
    [setData, setError]
  );

  const goNext = () => fetchPage(data?.next);
  const goPrev = () => fetchPage(data?.previous);

  return { data, loading, goNext, goPrev };
};

export default useRollingPaperData;
