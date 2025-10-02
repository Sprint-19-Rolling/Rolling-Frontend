import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const dropdownContainerVariants = cva('', {
  variants: {
    size: {
      basic:
        'rounded-lg bg-white  border border-gray-200 shadow-md max-h-[220px]',
      share: 'rounded bg-white shadow w-[138px]',
    },
  },
  defaultVariants: {
    size: 'basic',
  },
});

const listVariants = cva('flex flex-col gap-0', {
  variants: {
    size: {
      basic: 'gap-0',
      share: 'divide-y divide-gray-200',
    },
  },
  defaultVariants: {
    size: 'basic',
  },
});

const itemVariants = cva('cursor-pointer text-gray-900', {
  variants: {
    size: {
      basic: 'rounded-lg px-3 py-2 hover:bg-gray-100',
      share: 'px-3 py-4 hover:bg-gray-100',
    },
  },
  defaultVariants: {
    size: 'basic',
  },
});

/**
 * BasicDropdown 컴포넌트
 *
 * 주어진 항목 배열을 드롭다운 형식으로 렌더링하고,
 * 항목을 클릭하면 선택된 값을 콜백 함수로 반환합니다.
 *
 * @component
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string[]} props.items - 드롭다운에 표시할 항목 배열
 * @param {(value: string) => void} props.onSelect - 항목 선택 시 호출되는 콜백 함수
 * @param {string} [props.className] - 추가로 적용할 CSS 클래스명 (선택)
 * @param {'basic' | 'share'} [props.size='basic'] - 드롭다운 스타일 종류
 *
 * @example
 * <BasicDropdown
 *   items={['Option 1', 'Option 2']}
 *   onSelect={(item) => console.log(item)}
 *   size="share"
 * />
 */

const BasicDropdown = ({ items, onSelect, className = '', size = 'basic' }) => {
  return (
    <div className={cn(dropdownContainerVariants({ size }), className)}>
      <ul className={cn(listVariants({ size }))}>
        {items.map((item) => {
          return (
            <li
              key={item}
              onClick={() => onSelect?.(item)}
              className={cn(itemVariants({ size }))}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicDropdown;
