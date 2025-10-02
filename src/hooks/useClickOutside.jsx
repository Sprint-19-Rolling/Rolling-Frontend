/**
 * useClickOutside 훅
 *
 * 특정 요소(ref) 외부를 클릭하거나 터치했을 때 지정된 핸들러 함수를 실행하는 커스텀 훅입니다.
 * 주로 드롭다운, 모달 등의 컴포넌트 외부 클릭 시 닫기 기능을 구현할 때 사용됩니다.
 *
 * @param {React.RefObject<HTMLElement>} ref - 감지할 DOM 요소의 ref
 * @param {Function} handler - 요소 외부 클릭 시 호출될 콜백 함수
 *
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => {
 *   setIsOpen(false);
 * });
 */

import { useEffect } from 'react';

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
