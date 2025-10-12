import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const profileImageStyle = cva('rounded-full object-cover', {
  variants: {
    size: {
      xlarge: 'w-[80px] h-[80px]',
      medium: 'w-14 h-14',
      small: 'w-7 h-7',
    },
    borderColor: {
      gray: 'border border-gray-200',
      purple: 'border-3 border-purple-500',
      white: 'border-2 border-white',
    },
    isClickable: {
      true: 'cursor-pointer',
      false: 'cursor-default',
    },
  },
  defaultVariants: {
    size: 'medium',
    borderColor: 'gray',
    isClickable: false,
  },
});

const ProfileImage = ({
  src,
  alt = '',
  size,
  borderColor,
  isSelected = false,
  isClickable,
  className,
  onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={cn(
        profileImageStyle({ size, borderColor, isClickable }),
        isSelected && 'border-3 border-purple-500',
        className
      )}
    />
  );
};

export default ProfileImage;
