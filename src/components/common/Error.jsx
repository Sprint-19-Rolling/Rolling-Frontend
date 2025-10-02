import { useNavigate } from 'react-router';
import Button from '@/components/common/button/Button';
import Title from '@/components/common/Title';
import useError from '@/hooks/useError';

/**
 * 전역 ErrorContext의 상태를 받아 사용자에게 에러 정보를 표시하는 컴포넌트입니다.
 * 404 상태와 일반 에러 상태에 따라 다른 UI를 보여줍니다.
 * @returns {JSX.Element | null} 에러 상태에 따라 에러 UI를 반환하거나 null을 반환
 */

const Error = () => {
  const { error, setError } = useError();
  const navigate = useNavigate();

  const handleGoMain = () => {
    setError(null);
    navigate('/');
  };

  if (!error) {
    return null;
  }

  return (
    <div className="flex h-60 flex-col items-center justify-center gap-4 rounded-xl bg-white">
      {error.status === 404 ? (
        <>
          <Title as="h3">해당하는 데이터가 없어요 😢</Title>
          <Button onClick={handleGoMain} size={40} theme="secondary">
            메인으로 가기
          </Button>
        </>
      ) : (
        <>
          <Title as="h3">에러가 발생했습니다.</Title>
          <p>{error.message}</p>
          <Button onClick={handleGoMain} size={40} theme="outlined">
            메인으로 가기
          </Button>
        </>
      )}
    </div>
  );
};

export default Error;
