// components/rolling-paper-list/ListBackground.jsx

/**
 * 배경을 적용해 콘텐츠를 감싸는 Wrapper 컴포넌트
 * @param {Object} props
 * @param {string} [props.backgroundImageURL] - 배경 이미지 URL
 * @param {string} [props.backgroundColor] - 배경 색상
 * @param {React.ReactNode} props.children - 내부 콘텐츠
 */
export default function ListBackground({
  backgroundImageURL,
  backgroundColor,
  children,
}) {
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor };

  return (
    <div className="relative min-h-[400px] w-full p-4" style={backgroundStyle}>
      {children}
    </div>
  );
}
