import { useState, useRef } from 'react';
import icons from '@/assets/icons/icons';
import Button from '@/components/common/button/Button';
import BasicDropdown from '@/components/common/dropbox/BasicDropdown';
import { SHARE_DROPDOWN_ITEMS } from '@/constants/share';
import { useClickOutside } from '@/hooks/useClickOutside';

/**
 * ShareDropdown 컴포넌트
 *
 * 공유 아이콘 버튼을 클릭하면 공유 옵션 드롭다운(BasicDropdown)이 표시됩니다.
 * 드롭다운은 외부 영역 클릭 시 닫히며, 항목 선택 시 콜백 처리가 됩니다.
 * 드롭다운은 버튼의 오른쪽 테두리에 정렬되어 표시됩니다.
 *
 * @component
 * @param {function(string): void} props.onShareSelect - 항목 선택 시 호출될 콜백 함수
 * @returns {JSX.Element} 공유 버튼과 드롭다운 메뉴를 포함한 컴포넌트
 */

const ShareDropdown = ({ onShareSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (item) => {
    onShareSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        theme="icon"
        size={32}
        className={'w-9 sm:h-9 sm:w-14'}
        onClick={toggleDropdown}>
        <icons.ShareIcon />
      </Button>
      {isOpen && (
        <BasicDropdown
          items={SHARE_DROPDOWN_ITEMS}
          onSelect={handleSelect}
          size="share"
          className="absolute right-0 top-full mt-2"
        />
      )}
    </div>
  );
};

export default ShareDropdown;
