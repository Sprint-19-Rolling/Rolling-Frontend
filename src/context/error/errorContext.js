import { createContext } from 'react';

/**
 * 전역 에러 상태와 관리 함수를 제공하는 Context입니다.
 * @typedef {Object} ErrorContextType
 * @property {string | null} error - 현재 표시할 에러 메시지
 * @property {(message: string) => void} setError - 에러 메시지를 설정하는 함수
 */

/**
 * @type {React.Context<ErrorContextType>}
 */
export const ErrorContext = createContext({ error: null, setError: () => {} });
