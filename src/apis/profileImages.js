import { api } from '@/apis/axios';

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
export const fetchProfileImages = async (signal) => {
  try {
    const response = await api.get('profile-images/', { signal });
    const urls = response.data.imageUrls || [];

    return urls.length > 0 ? urls : FALLBACK_PROFILE_IMAGES;
  } catch (err) {
    console.error('❌ 프로필 이미지 불러오기 실패:', err);
    return FALLBACK_PROFILE_IMAGES;
  }
};
