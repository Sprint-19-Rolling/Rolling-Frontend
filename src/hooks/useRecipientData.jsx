import { teamApi } from '@/apis/axios';
import useDataFetch from '@/hooks/useDataFetch';

/**
 * 롤링페이퍼 수신자(Recipient)에 대한 헤더 표시용 핵심 데이터를 불러오는 커스텀 훅입니다.
 *
 * @typedef {Object} RecipientData
 * @property {string} name - 수신자의 이름
 * @property {number} messageCount - 롤링페이퍼에 작성된 총 메시지 개수
 * @property {Array} recentMessages - 최근 작성된 메시지 작성자 요약 목록 (최대 3개)
 * @property {number} reactionCount - 총 반응(이모티콘) 개수
 * @property {Array} topReactions - 가장 많이 받은 이모티콘 목록 (최대 3개)
 * @property {string} backgroundImageURL - 배경으로 들어온 이미지 주소, 이미지가 안들어오면 null 값
 * @property {string} backgroundColor - 배경으로 들어온 색상값, 이미지가 들어오면 기본값 begie 로 받음
 *
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 * recipient: RecipientData | null
 * setRecipientData: function(RecipientData | null)
 * loading: boolean
 * }} - 수신자 정보 객체와 로딩 상태를 반환
 */
const useRecipientData = (recipientId) => {
  const fetcher = async (signal) => {
    const res = await teamApi.get(`recipients/${recipientId}/`, { signal });

    return {
      name: res.data.name,
      messageCount: res.data.messageCount,
      recentMessages: res.data.recentMessages,
      reactionCount: res.data.reactionCount,
      topReactions: res.data.topReactions,
      backgroundImageURL: res.data.backgroundImageURL,
      backgroundColor: res.data.backgroundColor,
    };
  };

  const { data, setData, loading } = useDataFetch(fetcher, [recipientId]);

  return { recipientData: data, setRecipientData: setData, loading };
};

export default useRecipientData;
