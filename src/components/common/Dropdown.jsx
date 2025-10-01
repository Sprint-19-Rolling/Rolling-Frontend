import { useState, useEffect, useRef } from 'react';
import ArrowDown from '@/assets/icons/ic-arrow-down.svg';
import BasicDropdown from '@/components/common/BasicDropdown';

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const ref = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelected = (value) => {
    if (value === '선택해주세요') {
      setErrorMessage('Error Message');
      setSelected('');
      setIsDropdownOpen(false);
    } else {
      setErrorMessage(null);
      setSelected(value);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputClass = `border-1 h-[45px] w-full rounded px-3 py-2 pr-8 focus:outline-none 
    ${
      errorMessage
        ? 'border-red-500 focus-within:border-red-500 active:border-red-500' // 에러가 있을 때 빨간색 테두리
        : selected
          ? 'border-gray-700 font-bold text-blue-600' // 선택된 값이 있을 때 파란색 텍스트
          : 'border-gray-700 font-normal italic text-gray-900 placeholder-gray-900' // 기본 상태
    }
  `;

  return (
    <div className="relative w-[318px]" ref={ref}>
      <input
        type="text"
        value={selected}
        readOnly
        placeholder="placeholder"
        onClick={toggleDropdown}
        className={inputClass}
      />
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-900">
        <ArrowDown />
      </span>

      {errorMessage && (
        <p className="**top-full** absolute left-0 mt-1 text-sm text-red-500">
          {errorMessage || 'Placeholder'}
        </p>
      )}

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-[220px] w-full overflow-y-auto rounded-lg border bg-white p-2 shadow-lg">
          <BasicDropdown onSelect={handleSelected} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
