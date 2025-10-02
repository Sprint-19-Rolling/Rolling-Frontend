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
  const sizeStyles = {
    basic:
      'rounded-lg bg-white  border border-gray-200 shadow-md max-h-[220px]',
    share: 'rounded bg-white shadow w-[138px]',
  };

  const baseClasses = sizeStyles[size] || sizeStyles.basic;

  return (
    <div className={`${baseClasses} ${className}`}>
      <ul
        className={`flex flex-col gap-0 ${size === 'share' ? 'divide-y divide-gray-200' : 'gap-0'} `}>
        {items.map((item) => {
          return (
            <li
              key={item}
              onClick={() => onSelect?.(item)}
              className={`cursor-pointer text-gray-900 ${size === 'share' ? 'px-3 py-4 hover:bg-gray-100' : 'rounded-lg px-3 py-2 hover:bg-gray-100'} `}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicDropdown;
