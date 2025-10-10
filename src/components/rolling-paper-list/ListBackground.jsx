// components/rolling-paper-list/ListBackground.jsx
import { cn } from '@/utils/style';

/**
 * 배경을 적용해 콘텐츠를 감싸는 Wrapper 컴포넌트
 * @param {Object} props
 * @param {string} [props.backgroundImageURL] - 배경 이미지 URL
 * @param {string} [props.backgroundColor] - 배경 색상(beige|purple|blue|green)
 * @param {React.ReactNode} props.children - 내부 콘텐츠
 * @param {string} [props.className] - 추가적인 Tailwind 클래스
 */
export default function ListBackground({
  backgroundImageURL,
  backgroundColor,
  children,
  className,
}) {
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : backgroundColor
      ? {
          backgroundColor: `var(--color-${backgroundColor}-200)`,
        }
      : {
          backgroundColor: `var(--color-beige-200)`, // 기본값
        };
  return (
    <main className={cn('relative', className)} style={backgroundStyle}>
      {children}
    </main>
  );
}
