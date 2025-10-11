import icons from '@/assets/icons/icons';

/**
 * 롤링페이퍼 리스트 화살표 버튼
 */
const ArrowButton = ({ onClick, position }) => {
  const isLeft = position === 'left';
  const icon = isLeft ? icons.ArrowLeftIcon : icons.ArrowRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-gray-100 md:flex ${isLeft ? '-left-5' : '-right-5'} `}>
      <img
        src={icon}
        alt={isLeft ? '이전' : '다음'}
        className="aspect-square h-6 w-6 object-contain"
        draggable={false}
      />
    </button>
  );
};

export default ArrowButton;
