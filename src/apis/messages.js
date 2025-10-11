import { teamApi } from '@/apis/axios';
import { RECIPIENT_PAGE_LIMIT } from '@/constants/rollingPaperList';

/**
 * 특정 recipientId에 해당하는 메시지 목록을 불러오는 API 함수
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @param {AbortSignal} [signal] - 요청 취소를 위한 AbortSignal
 * @returns {Promise<{results: Array<Object>, nextUrl: string | null}>}
 */
export const getMessages = async (recipientId, signal) => {
  const res = await teamApi.get(
    `recipients/${recipientId}/messages/?limit=${RECIPIENT_PAGE_LIMIT}&offset=0`,
    { signal }
  );
  return { results: res.data.results, nextUrl: res.data.next };
};

/**
 * 무한 스크롤(nextUrl) 기반으로 추가 메시지를 불러오는 API 함수
 * @param {string} nextUrl - 다음 페이지의 API URL
 * @returns {Promise<{results: Array<Object>, nextUrl: string | null}>}
 */
export const getMoreMessages = async (nextUrl) => {
  const res = await teamApi.get(nextUrl);
  return { results: res.data.results, nextUrl: res.data.next };
};

/**
 * 특정 메시지를 삭제하는 API
 * @param {string} messageId - 삭제할 메시지의 ID
 * @returns {Promise<void>}
 */
export const deleteMessage = (messageId) =>
  teamApi.delete(`messages/${messageId}/`);
