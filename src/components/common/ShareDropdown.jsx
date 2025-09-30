import { useState, useRef, useEffect } from 'react';
import SharIcon from '@/assets/icons/ic-share.svg';

const ShareDropdownWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={toggleDropdown} className="p-1">
        <SharIcon className="h-6 w-6" />
      </button>

      {isOpen && <ShareDropdown />}
    </div>
  );
};

const ShareDropdown = () => {
  return (
    <div className="bg-white-700 absolute left-0 top-10 z-50 h-[120px] w-[140px] rounded p-2">
      <ul className="m-0 flex list-none flex-col p-0">
        <li className="cursor-pointer rounded-lg border-gray-900 px-3 py-2 hover:bg-gray-100">
          카카오톡 공유
        </li>
        <li className="cursor-pointer rounded-lg border-gray-900 px-3 py-2 hover:bg-gray-100">
          URL 공유
        </li>
      </ul>
    </div>
  );
};

export default ShareDropdownWrapper;
