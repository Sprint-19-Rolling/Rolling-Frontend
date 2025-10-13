import { useCallback, useState } from 'react';
import { getRollingPaperData } from '@/apis/recipients';
import { LIST_LIMIT } from '@/constants/list';
import useDataFetch from '@/hooks/useDataFetch';
import useError from '@/hooks/useError';

/**
 * 롤링페이퍼 데이터를 가져오는 커스텀 훅
 * - sort 기준에 따라 기본 데이터 로드
 * - mode='mobile'일 때는 데이터를 append하여 누적
 *
 * @param {string} [sort] - 정렬 기준 ('like' 또는 undefined)
 * @param {'desktop' | 'mobile'} [mode='desktop'] - 데이터 로드 모드
 * @returns {{
 *   data: Object[] | null,
 *   loading: boolean,
 *   goNext: () => void,
 *   goPrev: () => void,
 *   fetchMore: () => void,
 *   hasNext: boolean,
 *   isFetching: boolean
 * }}
 */
const useRollingPaperData = (sort, mode = 'desktop') => {
  const { setError } = useError();
  const [isFetching, setIsFetching] = useState(false);

  const fetcher = async (signal) =>
    getRollingPaperData(
      { limit: LIST_LIMIT, sort: sort === 'like' ? 'like' : null },
      signal
    );

  const { data, setData, loading } = useDataFetch(fetcher, [sort]);

  const fetchPage = useCallback(
    async (url) => {
      if (!url || mode !== 'desktop') {
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
    [setData, setError, mode]
  );

  const nextUrl = data?.next;

  const fetchMore = useCallback(async () => {
    if (!nextUrl || mode !== 'mobile') {
      return;
    }
    try {
      setIsFetching(true);
      const result = await getRollingPaperData({ url: nextUrl });
      setData((prev) => {
        if (!prev || !prev.results) {
          return result;
        }
        const merged = [...prev.results, ...result.results];
        const unique = merged.filter(
          (item, idx, arr) => idx === arr.findIndex((t) => t.id === item.id)
        );
        return { ...result, results: unique };
      });
    } catch (err) {
      setError({
        status: err.response?.status || 500,
        message:
          err.response?.data?.message ||
          '추가 데이터를 불러오는 데 실패했습니다.',
      });
    } finally {
      setIsFetching(false);
    }
  }, [nextUrl, mode, setData, setError]);

  const goNext = () => fetchPage(data?.next);
  const goPrev = () => fetchPage(data?.previous);

  return {
    data,
    loading,
    goNext,
    goPrev,
    hasNext: Boolean(nextUrl),
    isFetching,
    fetchMore,
  };
};

export default useRollingPaperData;
