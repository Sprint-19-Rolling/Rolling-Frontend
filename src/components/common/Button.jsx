import { buttonVariants } from '@/style/button-style';
import { cn } from '@/utils/style';

/**
 * 공통 버튼 컴포넌트
 * @param props.children - 버튼 내부에 표시할 내용
 * @param props.type - 버튼 타입 (button, submit, reset) 기본값: button
 * @param props.theme - 버튼 스타일 테마 ('primary' | 'secondary' | 'outlined' | 'icon') 기본값: primary
 * @param props.size - 버튼 높이 (28 | 32 | 36 | 40 | 56) 기본값: null
 * @param props.full - 풀 사이즈 버튼 여부 기본값: false
 * @param props.disabled - 버튼 비활성화 여부 기본값: false
 * @param props.onClick - 버튼 클릭 시 호출되는 콜백 함수
 */

const Button = ({
  children,
  type = 'button',
  theme = 'primary',
  size = null,
  full = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ theme, size, full }))}
      type={type}
      {...props}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
