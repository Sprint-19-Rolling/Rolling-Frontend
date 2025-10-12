import axios from 'axios';
import { api } from '@/apis/axios';

/**
 * 프로필 이미지 목록을 가져옵니다.
 * @returns {Promise<string[]>} 프로필 이미지 URL 배열
 */
export const fetchProfileImages = async (signal) => {
  try {
    const response = await api.get('profile-images/', { signal });
    return response.data.imageUrls || [];
  } catch (err) {
    // CanceledError는 조용히 무시 (React Strict Mode에서 정상 동작)
    if (axios.isCancel(err) || err.name === 'CanceledError') {
      return [];
    }

    // 실제 네트워크 에러만 로깅
    console.error('❌ 프로필 이미지 불러오기 실패:', err);
    throw err; // 에러를 다시 던져서 useDataFetch에서 처리하도록
  }
};
