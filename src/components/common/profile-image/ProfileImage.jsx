import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '@/utils/style';

const profileImageStyle = cva('rounded-full object-cover flex-shrink-0', {
  variants: {
    size: {
      xlarge: 'w-[80px] h-[80px]', // 선택된 큰 이미지
      medium: 'w-[56px] h-[56px]', // 나머지 썸네일
      small: 'w-7 h-7',
    },
    borderColor: {
      gray: 'border-gray-200',
      purple: 'border-[3px] border-purple-500',
      white: 'border-2 border-white',
    },
    isClickable: {
      true: 'cursor-pointer',
      false: 'cursor-default',
    },
  },
  defaultVariants: {
    size: 'xlarge',
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
  const finalBorderColor =
    isSelected && size !== 'xlarge' ? 'purple' : borderColor;

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={cn(
        profileImageStyle({ size, borderColor: finalBorderColor, isClickable }),
        className
      )}
    />
  );
};

ProfileImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xlarge', 'medium', 'small']),
  borderColor: PropTypes.oneOf(['gray', 'white', 'purple']),
  isSelected: PropTypes.bool,
  isClickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProfileImage;
