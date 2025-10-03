/**
 * List 페이지의 배경 영역
 *
 * @param {Object} props
 * @param {{ type: 'color'|'image', value: string } | null} props.data - 선택된 배경 정보
 * @param {React.ReactNode} props.children - 내부 콘텐츠
 */
const ListBackground = ({ data, children }) => {
  const style =
    data?.type === 'image'
      ? {
          backgroundImage: `url(${data.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {};

  const className =
    data?.type === 'color' ? `${data.value} min-h-screen` : 'min-h-screen';

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default ListBackground;
