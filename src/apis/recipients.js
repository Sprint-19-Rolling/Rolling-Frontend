import { teamApi } from '@/apis/axios';

/**
 * 해당하는 수신자 ID의 상세 데이터를 가져오는 API 호출 함수
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @param {AbortSignal} [signal] - 요청 취소용 AbortSignal
 * @returns {Promise<{
 *   name: string,
 *   messageCount: number,
 *   recentMessages: Array,
 *   reactionCount: number,
 *   topReactions: Array,
 *   backgroundImageURL: string | null,
 *   backgroundColor: string
 * }>}
 */
export const getRecipientData = async (recipientId, signal) => {
  const res = await teamApi.get(`recipients/${recipientId}/`, { signal });

  const {
    name,
    messageCount,
    recentMessages,
    reactionCount,
    topReactions,
    backgroundImageURL,
    backgroundColor,
  } = res.data;

  return {
    name,
    messageCount,
    recentMessages,
    reactionCount,
    topReactions,
    backgroundImageURL,
    backgroundColor,
  };
};

export const getRollingPaperData = async ({ limit = 4, sort }, signal) => {
  const res = await teamApi.get(
    `recipients/?limit=${limit}&offset=0${sort && `&sort=${sort}`}`,
    { signal }
  );
  return res.data;
};

/**
 * 특정 수신자를 삭제하는 API 호출 함수
 * @param {string} id - 삭제할 수신자의 ID
 * @returns {Promise<void>} 삭제 성공 시 아무 값도 반환하지 않습니다.
 */
export const deleteRecipient = (id) => teamApi.delete(`recipients/${id}/`);
