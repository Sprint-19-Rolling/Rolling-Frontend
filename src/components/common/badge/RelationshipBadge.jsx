// 관계 뱃지 컴포넌트

import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const relationshipBadgeStyle = cva(
  'inline-flex items-center justify-center rounded px-2 py-0.5 font-14-regular h-[20px]',
  {
    variants: {
      type: {
        친구: 'bg-blue-100 text-blue-600',
        가족: 'bg-green-100 text-green-600',
        동료: 'bg-purple-100 text-purple-600',
        지인: 'bg-orange-100 text-orange-600',
      },
    },
  }
);

/**
 * 관계 뱃지 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {'친구' | '가족' | '동료' | '지인'} props.type - 관계 유형
 * @returns {JSX.Element} 관계 뱃지 엘리먼트
 */
const RelationshipBadge = ({ type }) => {
  return <span className={cn(relationshipBadgeStyle({ type }))}>{type}</span>;
};

export default RelationshipBadge;
