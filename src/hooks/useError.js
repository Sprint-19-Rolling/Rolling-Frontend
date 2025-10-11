import { useContext } from 'react';
import { ErrorContext } from '@/context/error/errorContext';

/**
 * 전역 ErrorContext를 사용하기 위한 커스텀 훅입니다.
 * ErrorProvider 컴포넌트 내에서만 호출되어야 하며,
 * Context에 정의된 에러 상태와 설정 함수를 반환합니다.
 *
 * @returns {import('@/context/error/errorContext').ErrorContextType}
 * ErrorContext에서 제공하는 { error, setError } 객체를 반환합니다.
 * @throws {Error} ErrorProvider 외부에서 호출될 경우 오류를 발생시킵니다.
 */

const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('ErrorProvider 안에서 사용해야 합니다.');
  }

  return context;
};

export default useError;
