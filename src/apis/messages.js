import { teamApi } from '@/apis/axios';
import { RECIPIENT_PAGE_LIMIT } from '@/constants/rollingPaperList';

/**
 * 특정 recipientId에 해당하는 메시지 목록을 불러오는 API 함수
 *
 * @async
 * @function getMessages
 * @param {string|number} recipientId - 롤링페이퍼 수신자의 ID
 * @param {AbortSignal} [signal] - 요청 취소를 위한 AbortSignal
 * @returns {Promise<{results: Array<Object>, nextUrl: string | null}>}
 * 메시지 목록과 다음 페이지 URL을 반환합니다.
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
 *
 * @async
 * @function getMoreMessages
 * @param {string} nextUrl - 다음 페이지의 API URL
 * @returns {Promise<{results: Array<Object>, nextUrl: string | null}>}
 * 다음 페이지의 메시지 데이터와 다음 URL을 반환합니다.
 */
export const getMoreMessages = async (nextUrl) => {
  const res = await teamApi.get(nextUrl);
  return { results: res.data.results, nextUrl: res.data.next };
};

/**
 * 새로운 메시지를 생성하는 API 함수
 *
 * @async
 * @function createMessage
 * @param {string|number} recipient_id - 수신자 ID
 * @param {Object} messageData - 메시지 데이터
 * @param {string} messageData.sender - 발신자 이름
 * @param {string} messageData.profileImageURL - 프로필 이미지 URL
 * @param {string} messageData.relationship - 발신자와 수신자 관계
 * @param {string} messageData.content - 메시지 내용
 * @param {string} messageData.font - 폰트 이름
 * @param {Function} setError - 에러 메시지 상태를 업데이트하는 함수
 * @returns {Promise<Object>} API 응답 객체
 * @throws {Error} 메시지 전송 실패 시 에러를 발생시킵니다.
 */
export const createMessage = async (recipient_id, messageData, setError) => {
  const payload = {
    team: '19-7',
    recipient_id: Number(recipient_id),
    sender: messageData.sender,
    profileImageURL: messageData.profileImageURL,
    relationship: messageData.relationship,
    content: messageData.content,
    font: messageData.font,
  };

  try {
    console.log(payload);
    const response = await teamApi.post(
      `recipients/${recipient_id}/messages/`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    setError(''); // 성공 시 에러 초기화
    return response;
  } catch (err) {
    console.error('❌ 메시지 전송 실패:', err);
    setError('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    throw err; // 에러를 다시 던져 호출한 곳에서 처리할 수 있게 함
  }
};

/**
 * 특정 메시지를 삭제하는 API 함수
 *
 * @async
 * @function deleteMessage
 * @param {string|number} messageId - 삭제할 메시지의 ID
 * @returns {Promise<void>} 삭제 성공 시 아무 것도 반환하지 않습니다.
 */
export const deleteMessage = (messageId) =>
  teamApi.delete(`messages/${messageId}/`);

/**
 * 메시지를 생성하는 단순 POST 요청 API 함수
 *
 * @async
 * @function postMessage
 * @param {Object} params - 파라미터 객체
 * @param {string|number} params.recipientId - 수신자 ID
 * @param {Object} params.messageData - 메시지 데이터
 * @param {string} params.messageData.sender - 발신자 이름
 * @param {string} params.messageData.profileImageURL - 프로필 이미지 URL
 * @param {string} params.messageData.relationship - 관계
 * @param {string} params.messageData.content - 메시지 내용
 * @param {string} params.messageData.font - 폰트
 * @returns {Promise<Object>} 생성된 메시지의 응답 데이터
 */
export const postMessage = async ({ recipientId, messageData }) => {
  const res = await teamApi.post(
    `recipients/${recipientId}/messages/`,
    messageData
  );
  return res.data;
};
