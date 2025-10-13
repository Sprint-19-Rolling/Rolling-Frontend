// 이모지 뱃지 컴포넌트

import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const emojiBadgeStyle = cva(
  'inline-flex items-center justify-center rounded-full bg-black/50 text-white font-16-regular',
  {
    variants: {
      size: {
        s: 'px-3 py-2 h-[28px] font-14-regular',
        md: 'px-3 py-2 h-[36px]',
        lg: 'px-4 py-2 h-[38px]',
      },
    },
  }
);

/**
 * EmojiBadge 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.emoji - 뱃지에 표시할 이모지 (필수)
 * @param {number} [props.count] - 선택적으로 표시할 숫자
 * @param {'s' | 'md' | 'lg'} [props.size='md'] - 뱃지 크기
 * @returns {JSX.Element} 이모지와 숫자를 포함한 뱃지 요소
 */
const EmojiBadge = ({ emoji, count, size = 'md' }) => {
  return (
    <span className={cn(emojiBadgeStyle({ size }))}>
      <span className="mr-1.5">{emoji}</span>
      {count !== undefined && <span>{count}</span>}
    </span>
  );
};

export default EmojiBadge;
