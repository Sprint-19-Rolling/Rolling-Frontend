import { createContext } from 'react';

/**
 * 토스트 메시지 관련 상태와 제어 함수를 제공하는 Context
 * @typedef {Object} ToastContextType
 * @property {Array<{id: number, message: string, type: 'success' | 'error'}>} toasts - 현재 활성화된 토스트 메시지 목록
 * @property {(message: string, type?: 'success' | 'error') => void} showToast - 새로운 토스트를 추가하는 함수
 * @property {(id: number) => void} removeToast - 특정 ID의 토스트를 제거하는 함수
 */
export const ToastContext = createContext({
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
});
