import { useState, useEffect } from 'react';
import { fetchProfileImages } from '@/apis/messageApi';

/**
 * 프로필 이미지 목록을 관리하는 커스텀 훅
 * @returns {Object} profileImages, profileImageURL, setProfileImageURL
 */
export const useProfileImages = () => {
  const [profileImages, setProfileImages] = useState([]);
  const [profileImageURL, setProfileImageURL] = useState('');

  useEffect(() => {
    const loadProfileImages = async () => {
      const urls = await fetchProfileImages();
      setProfileImages(urls);
      setProfileImageURL(urls[0]);
    };
    loadProfileImages();
  }, []);

  return {
    profileImages,
    profileImageURL,
    setProfileImageURL,
  };
};
