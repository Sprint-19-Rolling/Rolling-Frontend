import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBackground } from '@/hooks/useBackground';
import { cn } from '@/utils/style';

const List = () => {
  const location = useLocation();
  const { to, backgroundData } = location.state || {};
  const { setBackground } = useBackground();

  useEffect(() => {
    if (backgroundData) {
      if (backgroundData.type === 'color') {
        // 컬러 배경 적용
        setBackground(backgroundData.value);
      } else if (backgroundData.type === 'image') {
        // 이미지 배경 적용
        setBackground(`url(${backgroundData.value})`);
      }
    }

    // 컴포넌트 언마운트 시 배경 초기화 (선택사항)
    return () => {
      setBackground('');
    };
  }, [backgroundData, setBackground]);

  // 배경 스타일 생성
  const getBackgroundStyle = () => {
    if (!backgroundData) {
      return {};
    }

    if (backgroundData.type === 'color') {
      return {}; // Tailwind class로 처리
    } else if (backgroundData.type === 'image') {
      return {
        backgroundImage: `url(${backgroundData.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
    return {};
  };

  return (
    <div
      className={cn(
        'min-h-screen',
        backgroundData?.type === 'color' ? backgroundData.value : ''
      )}
      style={getBackgroundStyle()}>
      <div className="mx-auto max-w-4xl">
        {/* 누구에게 작성했는지 표기 */}
        <h1 className="mb-4 text-2xl font-bold">To.{to}</h1>
        {to ? (
          <div className="rounded-lg bg-white/90 p-6 shadow-md backdrop-blur-sm">
            <p>
              <strong>Background:</strong>{' '}
              {backgroundData
                ? `${backgroundData.type === 'color' ? '컬러' : '이미지'} ${backgroundData.value}`
                : '선택 안 함'}
            </p>
            <p>무한 스크롤 확인용</p>
            <LinkButton to="/post/13916" size={40}>
              post 테스트용 1
            </LinkButton>
            <p>빈 데이터 확인용</p>
            <LinkButton to="/post/13926" size={40}>
              post 테스트용 2
            </LinkButton>
            <p>에러 확인용</p>
            <LinkButton to="/post/13955" size={40}>
              post 테스트용 3
            </LinkButton>
          </div>
        ) : (
          <div className="rounded-lg bg-white/90 p-6 shadow-md backdrop-blur-sm">
            <p>전달받은 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
