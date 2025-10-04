import { useCallback, useState } from 'react';
import { teamApi } from '@/apis/axios';
import { RECIPIENT_PAGE_LIMIT } from '@/constants/rollingPaperList';
import useDataFetch from '@/hooks/useDataFetch';
import useError from '@/hooks/useError';

/**
 * 특정 recipientId에 해당하는 메시지를 불러오고
 * 무한 스크롤(nextUrl) 기반으로 추가 데이터를 가져오는 커스텀 훅
 * @param {string} props.recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 * messages: Array<Object>,
 * loading: boolean,
 * isFetching: boolean,
 * nextUrl: string | null,
 * fetchMore: function
 * }} - 메시지 데이터와 무한 스크롤 상태 및 로직을 반환
 */
const useMessages = (recipientId) => {
  const { setError } = useError();

  const fetchMessages = async (signal) => {
    const res = await teamApi.get(
      `recipients/${recipientId}/messages/?limit=${RECIPIENT_PAGE_LIMIT}&offset=0`,
      { signal }
    );
    return { results: res.data.results, nextUrl: res.data.next };
  };

  const { data, setData, loading } = useDataFetch(fetchMessages, [recipientId]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMore = useCallback(async () => {
    if (!data?.nextUrl || isFetching) {
      return;
    }

    setIsFetching(true);
    try {
      const res = await teamApi.get(data.nextUrl);
      setData((prev) => ({
        results: [...prev.results, ...res.data.results],
        nextUrl: res.data.next,
      }));
    } catch (err) {
      setError({
        status: err.response?.status || 500,
        message: err.response?.data?.message || err.message,
      });
    } finally {
      setIsFetching(false);
    }
  }, [data, isFetching, setData, setError]);

  return {
    messages: data?.results || [],
    loading,
    isFetching,
    nextUrl: data?.nextUrl || null,
    fetchMore,
  };
};

export default useMessages;
