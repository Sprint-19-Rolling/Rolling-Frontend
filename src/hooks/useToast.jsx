import { useCallback, useRef, useState } from 'react';

/**
 * 토스트 메시지 목록을 생성, 표시 및 관리하는 커스텀 훅입니다.
 * @returns {{
 * toasts: Array<Object>,
 * showToast: function(message: string, type?: 'success' | 'error'),
 * removeToast: function(id: number)
 * }} - 현재 토스트 목록과 제어 함수를 반환합니다.
 */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  /**
   * 새로운 토스트 메시지를 목록에 추가합니다.
   * @param {string} message - 사용자에게 표시할 메시지 내용
   * @param {'success' | 'error'} [type='success'] - 토스트 메시지의 유형
   */
  const showToast = useCallback((message, type = 'success') => {
    toastId.current += 1;
    const id = toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  /**
   * 특정 ID를 가진 토스트 메시지를 목록에서 제거합니다.
   * @param {number} id - 제거할 토스트의 고유 ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
};

export default useToast;
