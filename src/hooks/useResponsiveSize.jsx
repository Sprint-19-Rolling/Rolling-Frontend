import { useEffect, useRef, useState } from 'react';
import {
  BREAKPOINT_TABLET,
  RECIPIENT_PAGE_LIMIT,
  RECIPIENT_PAGE_LIMIT_TABLET,
} from '@/constants/rollingPaperList';

/**
 * 현재 창 너비에 따라 메시지/이모지 목록의 페이지당 항목 수(limit)를 결정하는 헬퍼 함수입니다.
 * @param {number} width - 현재 창의 너비 (window.innerWidth).
 * @returns {number} 창 너비에 따른 페이지 크기(예: 6 또는 8)를 반환합니다.
 */
const getSizeWidth = (width) => {
  if (width <= BREAKPOINT_TABLET) {
    return RECIPIENT_PAGE_LIMIT_TABLET;
  }
  return RECIPIENT_PAGE_LIMIT;
};

/**
 * 창 크기 변경을 감지하고 디바운싱 처리하여 반응형 페이지 크기(limit)를 반환하는 커스텀 훅입니다.
 * @returns {number} 현재 창 크기에 따른 페이지당 항목 수.
 */
const useResponsiveSize = () => {
  const [pageSize, setPageSize] = useState(() =>
    getSizeWidth(window.innerWidth)
  );
  const timerRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        const newPageSize = getSizeWidth(window.innerWidth);
        setPageSize((prev) => (prev !== newPageSize ? newPageSize : prev));
      }, 100);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return pageSize;
};

export default useResponsiveSize;
