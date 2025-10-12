import { teamApi } from '@/apis/axios';
import { LIST_LIMIT } from '@/constants/list';

/**
 * 새로운 수신자를 생성하는 API 호출 함수
 * @param {Object} data - 생성할 수신자 정보
 * @param {string} data.name - 수신자 이름
 * @param {string} [data.backgroundColor] - 배경 색상 (선택)
 * @param {string} [data.backgroundImageURL] - 배경 이미지 URL (선택)
 * @returns {Promise<Object>} 생성된 수신자 정보
 */
export const createRecipient = async (data) => {
  const res = await teamApi.post(`recipients/`, data);
  return res.data;
};

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

/**
 * 롤링페이퍼 리스트 데이터를 가져오는 API
 * @param {Object} params - 요청 파라미터
 * @param {number} [params.limit=LIST_LIMIT] - 요청할 데이터 개수
 * @param {string} [params.sort] - 정렬 기준 ('like' | undefined)
 * @param {string} [params.url] - 페이지네이션용 전체 URL
 * @param {AbortSignal} [signal] - 요청 취소용 AbortSignal
 * @returns {Promise<Object>} 롤링페이퍼 리스트 데이터
 */
export const getRollingPaperData = async (
  { limit = LIST_LIMIT, sort, url },
  signal
) => {
  const endpoint = url
    ? url
    : `recipients/?limit=${limit}&offset=0${sort ? `&sort=${sort}` : ''}`;
  const res = await teamApi.get(endpoint, { signal });
  return res.data;
};

/**
 * 특정 수신자를 삭제하는 API 호출 함수
 * @param {string} id - 삭제할 수신자의 ID
 * @returns {Promise<void>} 삭제 성공 시 아무 값도 반환하지 않습니다.
 */
export const deleteRecipient = (id) => teamApi.delete(`recipients/${id}/`);
