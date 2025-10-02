import { useState, useRef } from 'react';
import ArrowDown from '@/assets/icons/ic-arrow-down.svg';
import BasicDropdown from '@/components/common/BasicDropdown';
import { useClickOutside } from '@/hooks/useClickOutside';

const Dropdown = () => {
  const DROPDOWN_ITEMS = [
    '선택해주세요',
    'texttexttext 1',
    'texttexttext 2',
    'texttexttext 3',
    'texttexttext 4',
    'texttexttext 5',
    'texttexttext 6',
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(DROPDOWN_ITEMS[0]);
  const [errorMessage, setErrorMessage] = useState(null);
  const ref = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelected = (value) => {
    if (value === DROPDOWN_ITEMS[0]) {
      setErrorMessage('Error Message');

      setIsDropdownOpen(false);
    } else {
      setErrorMessage(null);
      setSelected(value);
      setIsDropdownOpen(false);
    }
  };

  useClickOutside(ref, () => setIsDropdownOpen(false));

  const inputClass = `border-1 h-[45px] w-full rounded px-3 py-2 pr-8 focus:outline-none 
    ${
      errorMessage
        ? 'border-red-500 focus-within:border-red-500 active:border-red-500'
        : selected
          ? 'border-gray-700 font-bold text-blue-600'
          : 'border-gray-700 font-normal italic text-gray-900 placeholder-gray-900'
    }
  `;

  return (
    <div className="relative w-[318px]" ref={ref}>
      <input
        type="text"
        value={selected !== DROPDOWN_ITEMS[0] ? selected : ''}
        readOnly
        placeholder="placeholder"
        onClick={toggleDropdown}
        className={inputClass}
      />
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-900">
        <ArrowDown />
      </span>

      {errorMessage && (
        <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-[220px] w-full overflow-y-auto rounded-lg border bg-white p-2 shadow-lg">
          <BasicDropdown items={DROPDOWN_ITEMS} onSelect={handleSelected} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
