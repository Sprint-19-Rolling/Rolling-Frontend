import { cva } from 'class-variance-authority';
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
} from 'react';
import icons from '@/assets/icons/icons';
import BasicDropdown from '@/components/common/dropbox/BasicDropdown';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/style';

const DROPDOWN_ITEMS = ['지인', '친구', '가족', '동료'];

const inputVariants = cva(
  'border h-[50px] w-full rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-2 focus:border-gray-500 cursor-pointer',
  {
    variants: {
      error: {
        true: 'border-red-500',
        false: 'border-gray-300',
      },
      selected: {
        true: 'font-16-regular text-gray-900',
        false: 'font-normal  text-gray-900 placeholder-gray-900',
      },
    },
    defaultVariants: {
      error: false,
      selected: false,
    },
  }
);

/**
 * Dropdown 컴포넌트
 *
 * 사용자가 목록 중 하나를 선택할 수 있는 드롭다운 UI 컴포넌트입니다.
 * 유효성 검사를 위한 `validate` 메서드와 선택 값을 가져오는 `getValue` 메서드를
 * ref를 통해 외부에서 사용할 수 있습니다.
 *
 * 또한 `onChange` prop을 통해 선택된 값을 부모 컴포넌트로 전달할 수 있습니다.
 *
 * @component
 * @param {Object} props - 컴포넌트의 props
 * @param {string[]} [props.items] - 드롭다운에 표시할 항목 배열 (기본값: DROPDOWN_ITEMS)
 * @param {string} [props.placeholder] - 입력 필드에 표시될 플레이스홀더 텍스트 (기본값: "placeholder")
 * @param {function} [props.onChange] - 항목 선택 시 호출되는 콜백 (선택값을 부모로 전달)
 * @param {React.Ref} ref - 외부에서 getValue 및 validate 메서드에 접근할 수 있도록 하는 ref
 * @returns {JSX.Element} Dropdown 컴포넌트
 *
 * @example
 * const dropdownRef = useRef();
 *
 * <Dropdown
 *   ref={dropdownRef}
 *   items={['선택해주세요', '옵션1', '옵션2']}
 *   placeholder="옵션을 선택하세요"
 *   onChange={(value) => setRelationship(value)}
 * />
 *
 * const isValid = dropdownRef.current?.validate();
 * const selected = dropdownRef.current?.getValue();
 */

// 글꼴 이름별 font-family 매핑
const fontMap = {
  'noto sans': "'Noto Sans', sans-serif",
  pretendard: "'Pretendard', sans-serif",
  'nanum myeongjo': "'Nanum Myeongjo', serif",
  handletter: "'Nanum Pen Script', cursive",
};

const Dropdown = forwardRef(
  (
    {
      items = DROPDOWN_ITEMS,
      placeholder = 'placeholder',
      onChange, //  부모로 선택값 전달용
      className = '',
    },
    ref
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const containerRef = useRef(null);

    //  드롭다운 영역 밖 클릭 시 닫기
    useClickOutside(containerRef, () => setIsDropdownOpen(false));

    //  드롭다운 열기/닫기 토글
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    //  항목 선택 시 처리 로직
    const handleSelected = useCallback(
      (value) => {
        setSelected(value);
        setErrorMessage(null);
        setIsDropdownOpen(false);

        // 부모 컴포넌트로 선택값 전달
        if (onChange) {
          onChange(value);
        }
      },
      [onChange]
    );

    //  외부에서 제어 가능한 메서드 (getValue / validate)
    useImperativeHandle(ref, () => ({
      getValue: () => selected,
      validate: () => {
        if (!selected) {
          setErrorMessage('항목을 선택해주세요.');
          return false;
        }
        setErrorMessage(null);
        return true;
      },
    }));

    return (
      <div
        className={cn('relative w-full max-w-[320px]', className)}
        ref={containerRef}>
        {/* 입력창 (선택 표시 및 클릭으로 드롭다운 열기) */}
        <input
          type="text"
          value={selected}
          readOnly
          placeholder={selected ? '' : placeholder}
          onClick={toggleDropdown}
          className={cn(
            inputVariants({
              error: !!errorMessage,
              selected: !!selected,
            })
          )}
          style={{
            fontFamily:
              fontMap[selected.toLowerCase()] ||
              (items[0] && fontMap[items[0].toLowerCase()]) ||
              'inherit',
          }}
        />

        {/* ▼ 화살표 아이콘 */}
        <span className="pointer-events-none absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-900">
          <icons.ArrowDownIcon
            className={cn(
              'transition-transform duration-200',
              isDropdownOpen && 'rotate-180'
            )}
          />
        </span>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p className="absolute left-0 top-[calc(100%+4px)] mt-1 text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {/* 드롭다운 목록 */}
        {isDropdownOpen && (
          <BasicDropdown
            items={items}
            onSelect={handleSelected}
            className="absolute left-0 top-full z-50 mt-2 max-h-[220px] w-full shadow-lg"
            // 여기서 각 항목 글꼴 적용하려면 BasicDropdown에 스타일 적용 필요
          />
        )}
      </div>
    );
  }
);

export default Dropdown;
