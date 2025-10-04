//이모지 뱃지 컴포넌트

import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '@/utils/style';
const emojiBadgeStyle = cva(
  'flex items-center justify-center rounded-full bg-black/50 text-white font-16-regular',
  {
    variants: {
      size: {
        s: 'px-3 py-2 h-[28px] font-14-regular',
        md: 'px-3 py-2 h-[36px]',
        lg: 'px-3 py-1.5 h-[38px]',
      },
    },
  }
);
const EmojiBadge = ({ className, emoji, count, size = 'md' }) => {
  return (
    <span className={cn(emojiBadgeStyle({ size }), className)}>
      <span className="mr-1.5">{emoji}</span>
      {count !== undefined && <span>{count}</span>}
    </span>
  );
};
EmojiBadge.propTypes = {
  emoji: PropTypes.string.isRequired,
  count: PropTypes.number,
  size: PropTypes.oneOf(['s', 'md', 'lg']),
};
export default EmojiBadge;
