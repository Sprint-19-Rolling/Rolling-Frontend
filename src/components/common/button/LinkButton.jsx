import { Link } from 'react-router';
import { buttonVariants } from '@/style/components/buttonStyle';
import { cn } from '@/utils/style';

/**
 * 프로젝트의 표준 스타일이 적용된 Link 컴포넌트입니다.
 * HTML의 <a> 태그 대신 사용되며, React Router를 통해 페이지를 이동합니다.
 * `theme`, `size`, `full` prop을 통해 다양한 스타일 변형을 지원합니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - 버튼 내부에 표시할 콘텐츠 (필수)
 * @param {string} props.to - 이동할 경로 (React Router의 Link to 속성) (필수)
 * @param {'primary' | 'secondary' | 'outlined' | 'icon'} [props.theme='primary'] - 버튼의 색상 및 스타일 테마
 * @param {28 | 32 | 36 | 40 | 56 | null} [props.size=null] - 버튼의 높이 및 크기 (px 단위)
 * @param {'mobile' | 'tablet' | 'always' | null} [props.full=null] - 버튼을 100% 너비로 확장할 반응형 조건
 * @param {string} [props.className] - 버튼 요소에 적용할 추가적인 Tailwind CSS 클래스
 * @returns {JSX.Element} LinkButton 컴포넌트
 */
const LinkButton = ({
  to,
  children,
  theme = 'primary',
  size = null,
  full = null,
  className,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ theme, size, full }), className)}
      {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
