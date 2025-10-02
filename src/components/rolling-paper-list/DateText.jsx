import { cva } from 'class-variance-authority';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/utils/style';

const dataTextVariants = cva(`text-gray-400`, {
  variants: {
    size: {
      card: 'font-12-regular',
      modal: 'font-14-regular',
    },
  },
});

/**
 * 메시지 작성 시간을 표시하는 컴포넌트입니다.
 * @param {object} props
 * @param {string} props.createdAt - ISO 형식의 날짜 문자열 (필수)
 * @param {'card' | 'modal'} [props.size='card'] - 텍스트 크기 지정 기본값은 'card' (선택)
 * @param {string} [props.className] - 컴포넌트에 추가될 Tailwind CSS 클래스 (선택)
 * @returns {JSX.Element}
 */

const DateText = ({ createdAt, size = 'card', className }) => {
  return (
    <time
      dateTime={createdAt}
      className={cn(dataTextVariants({ size }), className)}>
      {formatDate(createdAt)}
    </time>
  );
};

export default DateText;
