import { api, teamApi } from '@/apis/axios';

const FALLBACK_PROFILE_IMAGES = [
  'https://cdn.photosmile.co.kr/photosmile/images/default_profile_1.png',
  'https://cdn.photosmile.co.kr/photosmile/images/default_profile_2.png',
  'https://cdn.photosmile.co.kr/photosmile/images/default_profile_3.png',
  'https://cdn.photosmile.co.kr/photosmile/images/default_profile_4.png',
];

/**
 * 프로필 이미지 목록을 가져옵니다.
 * @returns {Promise<string[]>} 프로필 이미지 URL 배열
 */
export const fetchProfileImages = async (setError) => {
  try {
    const response = await api.get('profile-images/');
    const urls = response.data.imageUrls || [];

    if (urls.length > 0) {
      setError(''); // 성공 시 에러 초기화
      return urls;
    }

    // API가 빈 배열을 반환하면 폴백 이미지를 사용
    setError(''); // 성공 시 에러 초기화
    return FALLBACK_PROFILE_IMAGES;
  } catch (err) {
    console.error('❌ 프로필 이미지 불러오기 실패:', err);
    setError(
      '프로필 이미지를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.'
    );
    return FALLBACK_PROFILE_IMAGES;
  }
};

/**
 * 메시지를 생성합니다.
 * @param {string} recipient_id - 수신자 ID
 * @param {Object} messageData - 메시지 데이터
 * @param {string} messageData.sender - 발신자 이름
 * @param {string} messageData.profileImageURL - 프로필 이미지 URL
 * @param {string} messageData.relationship - 관계
 * @param {string} messageData.content - 메시지 내용
 * @param {string} messageData.font - 폰트
 * @returns {Promise<Object>} API 응답
 */
export const createMessage = async (recipient_id, messageData, setError) => {
  const payload = {
    team: '19-7',
    recipient_id: Number(recipient_id),
    sender: messageData.sender,
    profileImageURL: messageData.profileImageURL,
    relationship: messageData.relationship,
    content: messageData.content,
    font: 'Noto Sans',
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
    throw err; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 함
  }
};
