import { cva } from 'class-variance-authority';
import icons from '@/assets/icons/icons';
import { cn } from '@/utils/style';

/**
 * 롤링페이퍼 리스트 화살표 버튼
 * - position: 'left' | 'right'
 */
const buttonStyles = cva(
  `absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 
   items-center justify-center rounded-full 
   bg-white/70 backdrop-blur-md border border-white/40 
   shadow-md transition-all hover:bg-white hover:shadow-lg 
   md:flex`,
  {
    variants: {
      position: {
        left: 'left-2.5',
        right: 'right-2.5',
      },
    },
    defaultVariants: {
      position: 'right',
    },
  }
);

const ArrowButton = ({ onClick, position }) => {
  const Icon = position === 'left' ? icons.ArrowLeftIcon : icons.ArrowRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(buttonStyles({ position }))}>
      <Icon className="h-5 w-5 text-gray-700" />
    </button>
  );
};

export default ArrowButton;
