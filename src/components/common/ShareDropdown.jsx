/**
 * ShareDropdownWrapper 컴포넌트
 *
 * 공유 아이콘 버튼을 눌렀을 때 공유 옵션 드롭다운을 표시하는 컴포넌트입니다.
 * 외부 클릭 시 드롭다운이 닫히며, 공유 방식(카카오톡/URL 공유)을 선택할 수 있습니다.
 *
 * @component
 *
 * @returns {JSX.Element} 공유 버튼과 드롭다운 메뉴를 포함한 컴포넌트
 *
 * @example
 * <ShareDropdownWrapper />
 */

import { useState, useRef } from 'react';
import ShareIcon from '@/assets/icons/ic-share.svg';
import BasicDropdown from '@/components/common/BasicDropdown';
import { useClickOutside } from '@/hooks/useClickOutside';

const ShareDropdownWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(ref, () => setIsOpen(false));

  const shareItems = ['카카오톡 공유', 'URL 공유'];

  const handleSelect = (item) => {
    if (item === '카카오톡 공유') {
      alert('카카오톡 공유기능 구현 필요');
    } else if (item === 'URL 공유') {
      alert('URL 공유 기능 구현 필요');
    }
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block h-9 w-14 rounded-lg border border-gray-300"
      ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex h-full w-full items-center justify-center">
        <ShareIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <BasicDropdown
          items={shareItems}
          onSelect={handleSelect}
          size="share"
          className="absolute left-1/2 top-full -translate-x-1/2"
        />
      )}
    </div>
  );
};

export default ShareDropdownWrapper;
