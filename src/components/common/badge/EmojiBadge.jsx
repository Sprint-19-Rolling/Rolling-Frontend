import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const emojiBadgeStyle = cva(
  'flex items-center justify-center rounded-full bg-black/54 text-white font-16-regular',
  {
    variants: {
      size: {
        md: 'px-2 py-1.5 h-[32px] sm:px-3 sm:py-2 sm:h-[36px]',
        lg: 'px-3 py-2 h-[28px] font-14-regular sm:px-3 sm:py-1.5 sm:h-[38px] sm:font-16-regular',
      },
    },
  }
);

/**
 * 선택된 이모지 반응의 개수를 표시하는 뱃지 컴포넌트입니다.
 * 이모지와 카운트를 포함하며, 다양한 크기(size)와 외부 스타일을 지원합니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {string} props.emoji - 표시할 이모지 문자열 (필수)
 * @param {number} [props.count] - 이모지 카운트 (필수)
 * @param {'md' | 'lg'} [props.size='md'] - 뱃지의 크기 옵션
 * @param {string} [props.className] - 뱃지에 적용할 추가적인 Tailwind CSS 클래스
 * @returns {JSX.Element} 이모지 뱃지 컴포넌트
 */

const EmojiBadge = ({ className, emoji, count, size = 'md' }) => {
  return (
    <span className={cn(emojiBadgeStyle({ size }), className)}>
      <span className="mr-1.5">{emoji}</span>
      <span>{count}</span>
    </span>
  );
};

export default EmojiBadge;
