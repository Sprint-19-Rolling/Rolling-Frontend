import { useCallback, useEffect, useState } from 'react';
import { teamApi } from '@/apis/axios';
import { MESSAGES_LIMIT } from '@/constants/rollingPaperList';
import useError from '@/hooks/useError';

/**
 * 특정 recipientId에 해당하는 메시지를 불러오고
 * 무한 스크롤(nextUrl) 기반으로 추가 데이터를 가져오는 커스텀 훅
 * @param {string} props.recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 * messages: Array,
 * loading: boolean,
 * isFetching: boolean,
 * nextUrl: string | null,
 * fetchMore: function
 * }} - 메시지 데이터와 무한 스크롤 상태 및 로직을 반환
 */
const useMessages = (recipientId) => {
  const { setError } = useError();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    if (!recipientId) {
      return;
    }

    // 기존 값 초기화
    setMessages([]);
    setNextUrl(null);
    setError(null);

    const fetchInit = async () => {
      setLoading(true);
      try {
        const response = await teamApi.get(
          `recipients/${recipientId}/messages/?limit=${MESSAGES_LIMIT}&offset=0`
        );
        setMessages(response.data.results);
        setNextUrl(response.data.next);
      } catch (err) {
        setError({
          status: err.response?.status || 500,
          message: err.response?.data?.message || err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInit();
  }, [recipientId, setError]);

  const fetchMore = useCallback(async () => {
    if (!nextUrl || isFetching) {
      return;
    }

    setIsFetching(true);
    try {
      const response = await teamApi.get(nextUrl);
      setMessages((prev) => [...prev, ...response.data.results]);
      setNextUrl(response.data.next);
    } catch (err) {
      setError({
        status: err.response?.status || 500,
        message: err.response?.data?.message || err.message,
      });
    } finally {
      setIsFetching(false);
    }
  }, [nextUrl, isFetching, setError]);

  return { messages, loading, isFetching, nextUrl, fetchMore };
};

export default useMessages;
