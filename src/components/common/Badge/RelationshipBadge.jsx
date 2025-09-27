import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '@/utils/style';

const relationshipBadgeStyle = cva(
  'inline-flex items-center justify-center rounded-lg px-2 py-0.5 font-16-regular h-[32px]',
  {
    variants: {
      type: {
        친구: 'bg-blue-100 text-blue-600',
        가족: 'bg-green-100 text-green-600',
        동료: 'bg-purple-100 text-purple-600',
        지인: 'bg-orange-100 text-orange-600',
      },
    },
    defaultVariants: {
      type: '지인',
    },
  }
);

const RelationshipBadge = ({ type }) => {
  return <span className={cn(relationshipBadgeStyle({ type }))}>{type}</span>;
};

RelationshipBadge.propTypes = {
  type: PropTypes.oneOf(['친구', '가족', '동료', '지인']).isRequired,
};

export default RelationshipBadge;
