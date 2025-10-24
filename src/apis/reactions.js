import { teamApi } from '@/apis/axios';

/**
 * 특정 롤링페이퍼의 반응(이모지) 목록을 가져옵니다.
 *
 * @param {Object} params - API 요청 파라미터
 * @param {string} [params.recipientId] - 롤링페이퍼 수신자 ID
 * @param {number} [params.limit] - 불러올 데이터 개수
 * @param {string} [params.url] - 다음 페이지 요청을 위한 URL (있을 경우 recipientId, limit 무시)
 * @param {AbortSignal} [signal] - 요청 취소용 AbortSignal
 *
 * @returns {Promise<{ reactionsArray: object[], next: string | null }>}
 * 반응 목록과 다음 페이지 URL을 반환합니다.
 */
export const getReactions = async ({ recipientId, limit, url }, signal) => {
  const endpoint = url
    ? url
    : `recipients/${recipientId}/reactions/?limit=${limit}&offset=0`;

  const response = await teamApi.get(endpoint, { signal });
  const reactionsArray = response.data.results;
  const next = response.data.next;

  return { reactionsArray, next };
};

/**
 * 특정 롤링페이퍼에 이모지 반응을 등록합니다.
 * @param {string} recipientId - 반응을 등록할 롤링페이퍼의 ID
 * @param {string} emoji - 선택된 이모지의 유니코드 (예: '😊')
 * @param {string} [type='increase'] - 반응 타입 ('increase' 또는 'decrease')
 * @returns {Promise<object>} - 서버에서 반환된 반응 데이터
 */
export const postReaction = async (recipientId, emoji, type = 'increase') => {
  const data = { emoji, type };
  const response = await teamApi.post(
    `recipients/${recipientId}/reactions/`,
    data
  );
  return response.data;
};
