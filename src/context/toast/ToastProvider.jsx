import { useCallback, useRef, useState } from 'react';
import { ToastContext } from '@/context/toast/toastContext';

/**
 * 전역 토스트 메시지 목록을 관리하고 하위 컴포넌트에 Context를 통해 제공하는 프로바이더입니다.
 * 토스트 메시지의 생성(showToast)과 제거(removeToast) 로직을 캡슐화하여 제공합니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - Context의 상태를 공유할 하위 React 요소들
 * @returns {JSX.Element} Toast Context Provider 컴포넌트
 */
const ToastProvider = ({ children }) => {
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

  return (
    <ToastContext value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext>
  );
};

export default ToastProvider;
