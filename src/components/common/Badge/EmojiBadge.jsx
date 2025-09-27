//이모지 뱃지 컴포넌트

import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '@/utils/style';

const emojiBadgeStyle = cva(
  'inline-flex items-center justify-center rounded-full bg-black/50 text-white font-16-regular',
  {
    variants: {
      size: {
        md: 'px-3 py-2 h-[36px] text-sm',
        lg: 'px-4 py-2 h-[40px] text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const EmojiBadge = ({ emoji, count, size }) => {
  return (
    <span className={cn(emojiBadgeStyle({ size }))}>
      <span className="mr-1">{emoji}</span>
      {count !== undefined && <span>{count}</span>}
    </span>
  );
};

EmojiBadge.propTypes = {
  emoji: PropTypes.string.isRequired,
  count: PropTypes.number,
  size: PropTypes.oneOf(['md', 'lg']),
};

export default EmojiBadge;
