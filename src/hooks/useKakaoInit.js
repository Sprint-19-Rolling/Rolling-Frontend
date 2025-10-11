import { useEffect } from 'react';
import { KAKAO_JAVASCRIPT_KEY } from '@/constants/share';

const useKakaoInit = () => {
  useEffect(() => {
    if (KAKAO_JAVASCRIPT_KEY && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, []);
};

export default useKakaoInit;
