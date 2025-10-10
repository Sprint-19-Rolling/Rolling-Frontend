import { getRecipientData } from '@/apis/recipients';
import useDataFetch from '@/hooks/useDataFetch';

/**
 * 롤링페이퍼 수신자 id에 해당하는 데이터를 불러오는 커스텀 훅
 * @typedef {Object} RecipientData
 * @property {string} name - 수신자의 이름
 * @property {number} messageCount - 롤링페이퍼에 작성된 총 메시지 개수
 * @property {Array} recentMessages - 최근 작성된 메시지 작성자 요약 목록
 * @property {number} reactionCount - 총 반응(이모티콘) 개수
 * @property {Array} topReactions - 가장 많이 받은 이모티콘 목록
 * @property {string | null} backgroundImageURL - 배경 이미지 URL
 * @property {string} backgroundColor - 배경 색상
 *
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 * recipientData: object | null,
 * setRecipientData: function,
 * loading: boolean
 * }}
 */
const useRecipientData = (recipientId) => {
  const fetcher = (signal) => getRecipientData(recipientId, signal);

  const { data, setData, loading } = useDataFetch(fetcher, [recipientId]);

  return { recipientData: data, setRecipientData: setData, loading };
};

export default useRecipientData;
