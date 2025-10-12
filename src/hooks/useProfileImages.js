import { useState, useEffect } from 'react';
import { fetchProfileImages } from '@/apis/messages';
import { useDataFetch } from '@/hooks/useDataFetch';

/**
 * 프로필 이미지 목록을 관리하는 커스텀 훅
 * @returns {Object} profileImages, profileImageURL, setProfileImageURL, loading, error
 */
export const useProfileImages = () => {
  const {
    data: profileImages = [],
    loading,
    error,
    refetch,
  } = useDataFetch(fetchProfileImages);

  const [profileImageURL, setProfileImageURL] = useState('');

  useEffect(() => {
    if (profileImages.length > 0) {
      setProfileImageURL(profileImages[0]);
    }
  }, [profileImages]);

  return {
    profileImages,
    profileImageURL,
    setProfileImageURL,
    loading,
    error,
    refetch,
  };
};
