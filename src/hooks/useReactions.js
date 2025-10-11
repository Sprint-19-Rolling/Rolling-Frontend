import { useCallback } from 'react';
import { getReactions } from '@/apis/reactions';
import useDataFetch from '@/hooks/useDataFetch';
import useResponsiveSize from '@/hooks/useResponsiveSize';

/**
 * 특정 recipientId에 해당하는 이모지 반응(Reaction) 목록을 불러오는 커스텀 훅입니다.
 * 화면 크기에 따라 pageSize를 동적으로 조정하며, 데이터 페칭은 `useDataFetch` 훅을 통해 관리됩니다.
 * @typedef {Object} Reaction
 * @property {string} emoji - 반응으로 사용된 이모티콘
 * @property {number} count - 해당 이모티콘이 받은 개수
 * @property {boolean} isSelected - 사용자가 선택한 이모티콘 여부
 *
 * @param {string} recipientId - 반응을 불러올 롤링페이퍼 수신자의 ID
 * @returns {{
 *   reactions: Reaction[] | null,  // 이모지 반응 목록
 *   setReactions: function(Reaction[] | null): void, // 반응 상태 수동 업데이트 함수
 *   loading: boolean,              // 초기 데이터 로딩 상태
 *   pageSize: number               // 현재 반응 목록에 사용된 페이지 크기 (반응 개수 제한)
 * }}
 */
const useReactions = (recipientId) => {
  const pageSize = useResponsiveSize();

  const fetcher = useCallback(
    (signal) => getReactions(recipientId, pageSize, signal),
    [recipientId, pageSize]
  );

  const { data, setData, loading } = useDataFetch(fetcher, [
    recipientId,
    pageSize,
  ]);

  return { reactions: data, setReactions: setData, loading, pageSize };
};

export default useReactions;
