import { createContext } from 'react';

/**
 * @typedef {Object} ErrorPayload
 * @property {number} status - HTTP 상태 코드 (예: 404, 500).
 * @property {string} message - 사용자에게 표시할 에러 메시지.
 */

/**
 * 전역 에러 상태와 관리 함수를 제공하는 Context입니다.
 *
 * @typedef {Object} ErrorContextType
 * @property {ErrorPayload | null} error - 현재 표시할 에러 객체. 에러가 없으면 null.
 * @property {(errorData: ErrorPayload | null) => void} setError - 에러 상태를 설정하는 함수.
 * (null을 전달하면 에러 상태 초기화)
 */
/**
 * @type {React.Context<ErrorContextType>}
 */
export const ErrorContext = createContext({ error: null, setError: () => {} });
