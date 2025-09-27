import { Link } from 'react-router';
import { buttonVariants } from '@/style/button-style';
import { cn } from '@/utils/style';

/**
 * 공통 링크 버튼 컴포넌트 (페이지 이동을 위해 사용)
 * @param props.children - 링크 버튼 내부에 표시할 내용
 * @param props.to - 이동 경로
 * @param props.theme - 링크 버튼 스타일 테마 ('primary' | 'secondary' | 'outlined' | 'icon') 기본값: primary
 * @param props.size - 링크 버튼 높이 (28 | 32 | 36 | 40 | 56) 기본값: null
 * @param props.full - 풀 사이즈 링크 버튼 여부 기본값: false
 */

const LinkButton = ({
  to,
  children,
  theme = 'primary',
  size = null,
  full = false,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ theme, size, full }))}
      {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
