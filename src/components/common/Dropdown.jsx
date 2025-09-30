import { useState, useEffect, useRef } from 'react';
import ArrowDown from '@/assets/icons/ic-arrow-down.svg';
import BasicDropdown from '@/components/common/BasicDropdown';

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const ref = useRef(null);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSelected = (value) => {
    setSelected(value);
    setIsDropdownOpen(false);
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
  return (
    <div className="relative w-[318px]" ref={ref}>
      <input
        type="text"
        value={selected}
        readOnly
        placeholder="placeholder"
        onClick={toggleDropdown}
        className={`border-1 h-[45px] w-full rounded border-gray-700 px-3 py-2 pr-8 ${
          selected
            ? 'font-bold text-blue-600'
            : 'font-normal italic text-gray-900 placeholder-gray-900'
        }`}
      />
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-900">
        <ArrowDown />
      </span>
      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-[220px] w-full overflow-y-auto rounded-lg border bg-white p-2 shadow-lg">
          <BasicDropdown onSelect={handleSelected} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
