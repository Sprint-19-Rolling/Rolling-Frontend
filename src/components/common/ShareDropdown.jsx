import { useState, useRef } from 'react';
import ShareIcon from '@/assets/icons/ic-share.svg';
import { useClickOutside } from '@/hooks/useClickOutside';

const ShareDropdownWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      className="border-1 relative inline-block h-9 w-14 rounded-lg border-gray-300"
      ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex h-full w-full items-center justify-center">
        <ShareIcon className="h-6 w-6" />
      </button>

      {isOpen && <ShareDropdown />}
    </div>
  );
};

const ShareDropdown = () => {
  return (
    <div className="absolute top-full w-[138px] -translate-x-1/2 rounded bg-white shadow">
      <ul className="m-0 flex list-none flex-col gap-0 divide-y divide-gray-200 p-0">
        <li
          onClick={() => alert('카카오톡 공유기능 구현 필요')}
          className="cursor-pointer px-3 py-4 hover:bg-gray-100">
          카카오톡 공유
        </li>
        <li
          onClick={() => alert(' URL 공유 공유기능 구현 필요')}
          className="cursor-pointer px-3 py-4 hover:bg-gray-100">
          URL 공유
        </li>
      </ul>
    </div>
  );
};

export default ShareDropdownWrapper;
