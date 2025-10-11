import { useCallback, useState } from 'react';
import { deleteMessage, getMessages, getMoreMessages } from '@/apis/messages';
import useDataFetch from '@/hooks/useDataFetch';
import useError from '@/hooks/useError';

/**
 * 특정 recipientId에 해당하는 메시지를 불러오고
 * 무한 스크롤(nextUrl) 기반으로 추가 데이터를 가져오는 커스텀 훅
 *
 * @typedef {Object} Message
 * @property {string} id - 메시지의 고유 ID
 * @property {string} sender - 보낸 사람 이름
 * @property {string} relationship - 수신자와의 관계
 * @property {string} content - 메시지 내용
 * @property {string} font - 메시지 폰트 스타일
 * @property {string} profileImageURL - 보낸 사람 프로필 이미지 URL
 * @property {string} createdAt - 메시지 생성 시각
 *
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 *   messages: Message[],
 *   loading: boolean,
 *   isFetching: boolean,
 *   nextUrl: string | null,
 *   fetchMore: () => Promise<void>
 * }}
 */
const useMessages = (recipientId) => {
  const { setError } = useError();
  const [isFetching, setIsFetching] = useState(false);

  const fetcher = async (signal) => getMessages(recipientId, signal);
  const { data, setData, loading } = useDataFetch(fetcher, [recipientId]);

  const deleteMessageById = useCallback(
    async (messageId) => {
      // 낙관적 업데이트
      setData((prev) => ({
        ...prev,
        results: prev.results.filter((msg) => msg.id !== messageId),
      }));

      try {
        await deleteMessage(messageId);
        return true;
      } catch (err) {
        setError({
          status: err.response?.status || 500,
          message: err.response?.data?.message || err.message,
        });
        return false;
      }
    },
    [setData, setError]
  );

  const fetchMore = useCallback(async () => {
    if (!data?.nextUrl || isFetching) {
      return;
    }

    setIsFetching(true);
    try {
      const nextData = await getMoreMessages(data.nextUrl);
      setData((prev) => ({
        results: [...prev.results, ...nextData.results],
        nextUrl: nextData.nextUrl,
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
    deleteMessageById,
  };
};

export default useMessages;
