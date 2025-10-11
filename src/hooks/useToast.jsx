import { useContext } from 'react';
import { ToastContext } from '@/context/toast/toastContext';

/**
 * 토스트 메시지 목록을 생성, 표시 및 관리하는 커스텀 훅입니다.
 * @returns {{
 * toasts: Array<Object>,
 * showToast: function(message: string, type?: 'success' | 'error'),
 * removeToast: function(id: number)
 * }} - 현재 토스트 목록과 제어 함수를 반환합니다.
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;
