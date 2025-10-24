import { useCallback } from 'react';
import { getReactions } from '@/apis/reactions';
import useDataFetch from '@/hooks/useDataFetch';
import useError from '@/hooks/useError';
import useResponsiveSize from '@/hooks/useResponsiveSize';

/**
 * 특정 recipientId에 해당하는 이모지 반응(Reaction) 목록을 불러오는 커스텀 훅입니다.
 * 화면 크기에 따라 pageSize를 동적으로 조정하며, 데이터 페칭은 `useDataFetch` 훅을 통해 관리됩니다.
 *
 * @typedef {Object} Reaction
 * @property {string} emoji - 반응으로 사용된 이모티콘
 * @property {number} count - 해당 이모티콘이 받은 개수
 * @property {boolean} isSelected - 사용자가 선택한 이모티콘 여부
 *
 * @param {string} recipientId - 반응을 불러올 롤링페이퍼 수신자의 ID
 *
 * @returns {{
 *   reactions: Reaction[] | null,     // 현재 이모지 반응 목록
 *   setReactions: function(Reaction[] | null): void, // 반응 상태 수동 업데이트 함수
 *   loading: boolean,                 // 초기 데이터 로딩 상태
 *   pageSize: number,                 // 페이지 크기 (limit)
 *   hasNext: boolean,                 // 다음 페이지 존재 여부
 *   goNext: function(): Promise<void> // 다음 페이지 불러오기 함수
 * }}
 */
const useReactions = (recipientId) => {
  const { setError } = useError();
  const pageSize = useResponsiveSize();

  const fetcher = useCallback(
    (signal) => getReactions({ recipientId, limit: pageSize }, signal),
    [recipientId, pageSize]
  );

  const { data, setData, loading } = useDataFetch(fetcher, [
    recipientId,
    pageSize,
  ]);

  const nextUrl = data?.next;

  const fetchReactions = useCallback(
    async (nextUrl) => {
      if (!nextUrl) {
        return;
      }
      try {
        const result = await getReactions({ url: nextUrl });
        setData((prev) => {
          if (!prev || !prev.reactionsArray) {
            return result;
          }

          return {
            reactionsArray: [...prev.reactionsArray, ...result.reactionsArray],
            next: result.next,
          };
        });
      } catch (err) {
        setError({
          status: err.response?.status || 500,
          message:
            err.response?.data?.message ||
            '페이지 데이터를 불러오는 데 실패했습니다.',
        });
      }
    },
    [setError, setData]
  );

  const goNext = () => fetchReactions(nextUrl);

  const reactions = data?.reactionsArray ?? null;

  const setReactions = useCallback(
    (updater) => {
      setData((prev) => {
        const updated =
          typeof updater === 'function'
            ? updater(prev?.reactionsArray ?? [])
            : updater;

        return {
          ...prev,
          reactionsArray: updated,
          next: prev?.next ?? null,
        };
      });
    },
    [setData]
  );

  return {
    reactions,
    setReactions,
    loading,
    pageSize,
    hasNext: Boolean(nextUrl),
    goNext,
  };
};

export default useReactions;
