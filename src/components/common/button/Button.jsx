import { buttonVariants } from '@/style/components/buttonStyle';
import { cn } from '@/utils/style';

/**
 * 프로젝트의 표준 스타일이 적용된 재사용 가능한 Button 컴포넌트입니다.
 * `theme`, `size`, `full` prop을 통해 다양한 스타일 변형을 지원합니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - 버튼 내부에 표시할 콘텐츠 (필수)
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - HTML button의 type 속성
 * @param {'primary' | 'secondary' | 'outlined' | 'icon'} [props.theme='primary'] - 버튼의 색상 및 스타일 테마
 * @param {28 | 32 | 36 | 40 | 56 | null} [props.size=null] - 버튼의 높이 및 크기 (px 단위)
 * @param {'mobile' | 'tablet' | 'always' | null} [props.full=null] - 버튼을 100% 너비로 확장할 반응형 조건
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 상태 여부
 * @param {function} [props.onClick] - 버튼 클릭 시 실행될 핸들러 함수
 * @param {string} [props.className] - 버튼 요소에 적용할 추가적인 Tailwind CSS 클래스
 * @returns {JSX.Element} 버튼 컴포넌트
 */
const Button = ({
  children,
  type = 'button',
  theme = 'primary',
  size = null,
  full = null,
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ theme, size, full }), className)}
      type={type}
      {...props}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
