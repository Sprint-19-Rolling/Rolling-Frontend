import { api } from '@/apis/axios';

/**
 * 배경 이미지 목록을 불러옵니다.
 * react-image-gallery 라이브러리에 맞는 포맷으로 변환합니다.
 * @param {AbortSignal} [signal] - 요청 취소용 AbortSignal
 * @returns {Promise<Array<{ original: string, thumbnail: string }>>} - 이미지 갤러리용 포맷
 */
export const getBackgroundImages = async (signal) => {
  const res = await api.get('/background-images/', { signal });
  const originals = res.data.imageUrls || [];
  return originals.map((url) => ({
    original: url,
    thumbnail: url.replace(/\/\d+\/\d+$/, '/200/200'),
  }));
};
