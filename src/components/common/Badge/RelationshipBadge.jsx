import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '@/utils/style';

// 관계 뱃지 스타일 정의 (API 값: 한글)
const relationshipBadgeStyle = cva(
  'inline-flex items-center justify-center rounded-lg px-3 py-2 font-16-regular',
  {
    variants: {
      type: {
        친구: 'bg-blue-100 text-blue-600',
        가족: 'bg-green-100 text-green-600',
        동료: 'bg-purple-100 text-purple-600',
        지인: 'bg-orange-100 text-orange-600',
      },
      size: {
        sm: 'h-[28px] text-xs',
        md: 'h-[32px] text-sm',
      },
    },
    defaultVariants: {
      type: '지인',
      size: 'md',
    },
  }
);

export const RelationshipBadge = ({ type = '지인', size = 'md' }) => {
  return (
    <span className={cn(relationshipBadgeStyle({ type, size }))}>{type}</span>
  );
};

RelationshipBadge.propTypes = {
  type: PropTypes.oneOf(['친구', '가족', '동료', '지인']),
  size: PropTypes.oneOf(['sm', 'md']),
};

export default RelationshipBadge;
