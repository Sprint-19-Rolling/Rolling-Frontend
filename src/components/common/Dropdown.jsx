import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
} from 'react';
import icons from '@/assets/icons/icons';
import BasicDropdown from '@/components/common/BasicDropdown';
import { useClickOutside } from '@/hooks/useClickOutside';

const DROPDOWN_ITEMS = [
  '선택해주세요',
  'texttexttext 1',
  'texttexttext 2',
  'texttexttext 3',
];

const Dropdown = forwardRef(
  ({ items = DROPDOWN_ITEMS, placeholder = 'placeholder' }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const containerRef = useRef(null);

    useClickOutside(containerRef, () => setIsDropdownOpen(false));

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleSelected = useCallback(
      (value) => {
        setSelected(value === items[0] ? '' : value);
        setErrorMessage(null);
        setIsDropdownOpen(false);
      },
      [items]
    );

    useImperativeHandle(ref, () => ({
      getValue: () => selected,
      validate: () => {
        if (!selected || selected === items[0]) {
          setErrorMessage('항목을 선택해주세요.');
          return false;
        }
        setErrorMessage(null);
        return true;
      },
    }));

    const inputClass = `
      border h-[45px] w-full rounded px-3 py-2 pr-8 focus:outline-none
      ${
        errorMessage
          ? 'border-red-500'
          : selected
            ? 'border-gray-700 font-bold text-blue-600'
            : 'border-gray-700 font-normal italic text-gray-900 placeholder-gray-900'
      }
    `;

    return (
      <div className="relative w-[318px]" ref={containerRef}>
        <input
          type="text"
          value={selected}
          readOnly
          placeholder={placeholder}
          onClick={toggleDropdown}
          className={inputClass}
        />

        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-900">
          <icons.ArrowDownIcon />
        </span>

        {errorMessage && (
          <p className="absolute left-0 top-[calc(100%+4px)] mt-1 text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {isDropdownOpen && (
          <BasicDropdown
            items={items}
            onSelect={handleSelected}
            className="absolute left-0 top-full z-50 mt-1 max-h-[220px] w-full shadow-lg"
          />
        )}
      </div>
    );
  }
);

export default Dropdown;
