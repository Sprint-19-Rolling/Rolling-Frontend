import { cva } from 'class-variance-authority';
import { fontMap } from '@/constants/fontMap';
import { cn } from '@/utils/style';

const dropdownContainerVariants = cva(
  'py-2.5 bg-white shadow rounded-lg border border-gray-200',
  {
    variants: {
      size: {
        basic: 'max-h-[220px]',
        share: 'w-[138px]',
      },
    },
    defaultVariants: {
      size: 'basic',
    },
  }
);

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
 * @param {Object} [props.fontMap] - 글꼴 이름과 font-family 매핑 객체 (선택)
 *
 * @example
 * <BasicDropdown
 *   items={['Option 1', 'Option 2']}
 *   onSelect={(item) => console.log(item)}
 *   size="share"
 * />
 */

const BasicDropdown = ({
  items,
  onSelect,
  selected,
  className = '',
  size = 'basic',
  fontMap: customFontMap = fontMap,
}) => {
  return (
    <div className={cn(dropdownContainerVariants({ size }), className)}>
      <ul className="flex flex-col">
        {items.map((item) => {
          const fontFamily = customFontMap[item.toLowerCase()] || 'inherit';
          const isActive = item === selected;
          return (
            <li
              key={item}
              onClick={() => onSelect?.(item)}
              className={cn(
                'h-[50px] cursor-pointer px-4 py-3 text-gray-900 hover:bg-gray-100',
                isActive && 'bg-gray-200 font-semibold'
              )}
              style={{ fontFamily }}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicDropdown;
