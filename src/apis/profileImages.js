import { api } from '@/apis/axios';

/**
 * 프로필 이미지 목록을 가져옵니다.
 * @returns {Promise<string[]>} 프로필 이미지 URL 배열
 */
export const fetchProfileImages = async (signal) => {
  const response = await api.get('profile-images/', { signal });
  return response.data.imageUrls || []; // 이미지 URL 배열이 없으면 빈 배열 반환
};
