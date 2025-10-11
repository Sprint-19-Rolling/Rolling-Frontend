import axios from 'axios';

const API_BASE_URL = 'https://rolling-api.vercel.app';
const TEAM_ID = '19-7';

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
export const fetchProfileImages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile-images/`);
    const urls = response.data.imageUrls || [];
    if (urls.length > 0) {
      return urls;
    }
    // API가 빈 배열을 반환하면 폴백 이미지를 사용합니다.
    return FALLBACK_PROFILE_IMAGES;
  } catch (err) {
    console.error('❌ 프로필 이미지 불러오기 실패:', err);
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
export const createMessage = async (recipient_id, messageData) => {
  const response = await axios.post(
    `${API_BASE_URL}/${TEAM_ID}/recipients/${recipient_id}/messages/`,
    messageData,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response;
};
