import { useState } from 'react';
import { ErrorContext } from './errorContext';

/**
 * 전역적인 에러 상태를 관리하고 하위 컴포넌트에 제공하는 프로바이더 컴포넌트입니다.
 * - `error`: 현재 에러 메시지 데이터 (`null` 또는 `string`)
 * - `setError`: 에러 상태를 설정하는 React의 상태 함수
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - Context의 상태를 공유할 하위 React 요소들
 * @returns {JSX.Element} Context Provider 컴포넌트.
 */

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return <ErrorContext value={{ error, setError }}>{children}</ErrorContext>;
};

export default ErrorProvider;
