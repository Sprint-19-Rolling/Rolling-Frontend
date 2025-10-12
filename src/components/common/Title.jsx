import { cn } from '@/utils/style';

/**
 * 콘텐츠의 제목을 표시하는 유연한 컴포넌트입니다.
 * 폰트 스타일을 Tailwind 클래스로 기본 적용하며,
 * `as` prop을 통해 렌더링될 HTML 헤딩 태그(h2-h6)를 동적으로 결정할 수 있습니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - 표시할 제목 콘텐츠 (필수)
 * @param {string} [props.className] - 제목에 적용할 추가적인 Tailwind CSS 클래스
 * @param {'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [props.as='h2'] - 실제로 렌더링될 HTML 헤딩 태그
 * @returns {JSX.Element} 동적으로 렌더링된 제목 컴포넌트.
 */
const Title = ({ children, className, as: Component = 'h2' }) => {
  return (
    <Component
      className={cn('font-20-bold md:font-24-bold text-gray-900', className)}>
      {children}
    </Component>
  );
};

export default Title;
