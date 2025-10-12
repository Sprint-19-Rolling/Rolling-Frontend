import { useCallback } from 'react';
import { getProfileImages } from '@/apis/profileImages';
import useDataFetch from '@/hooks/useDataFetch';

/**
 * 프로필 이미지 목록을 관리하는 커스텀 훅
 * - 단순히 이미지 목록을 가져오고 로딩 상태를 관리합니다.
 * - 선택된 이미지 상태는 컴포넌트에서 별도로 관리하세요.
 */
const useProfileImages = () => {
  const fetcher = useCallback((signal) => getProfileImages(signal), []);

  const { data, loading } = useDataFetch(fetcher, []);

  return { loading, profileImages: data };
};

export default useProfileImages;
