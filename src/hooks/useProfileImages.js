import { useCallback } from 'react';
// 1. 여기서 'fetchProfileImages'로 이름을 변경했습니다.
import { fetchProfileImages } from '@/apis/profileImages';
import useDataFetch from '@/hooks/useDataFetch';

/**
 * 프로필 이미지 목록을 관리하는 커스텀 훅
 * - 단순히 이미지 목록을 가져오고 로딩 상태를 관리합니다.
 * - 선택된 이미지 상태는 컴포넌트에서 별도로 관리하세요.
 */
const useProfileImages = () => {
  // 2. fetcher 내부에서 사용하는 함수 이름도 'fetchProfileImages'로 변경했습니다.
  const fetcher = useCallback((signal) => fetchProfileImages(signal), []);

  const { data, loading, error } = useDataFetch(fetcher, []);

  return { profileImages: data, loading, error };
};
export default useProfileImages;
