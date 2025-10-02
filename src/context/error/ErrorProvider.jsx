import { useState } from 'react';
import { ErrorContext } from './errorContext';

/**
 * 전역 에러 상태를 관리하고 하위 컴포넌트에 제공하는 프로바이더 컴포넌트입니다.
 *
 * 이 컴포넌트는 Context를 통해 다음 객체를 제공합니다:
 * - `error`: 현재 에러 메시지 데이터 { status: number, message: string } 객체 혹은 `null`.
 * - `setError`: 에러 상태를 설정하는 함수 (ErrorPayload 객체 또는 null)을 인수로 받음
 * * @typedef {import('./errorContext').ErrorPayload} ErrorPayload - ErrorContext에 정의된 에러 객체 타입
 *
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - Context의 상태를 공유할 하위 React 요소
 * @returns {JSX.Element} Context Provider 컴포넌트
 */

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return <ErrorContext value={{ error, setError }}>{children}</ErrorContext>;
};

export default ErrorProvider;
