import { useEffect } from 'react';

const useKakaoInit = () => {
  const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, [KAKAO_JAVASCRIPT_KEY]);
};

export default useKakaoInit;
