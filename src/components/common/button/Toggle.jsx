import { useState } from 'react';
import { cn } from '@/utils/style';

/**
 * ToggleSwitch 컴포넌트
 *
 * '기본'과 '편집' 두 상태를 토글하는 스위치 버튼입니다.
 * 클릭 시 상태가 변경되며, 상태에 따라 버튼의 배경색, 텍스트, 위치가 달라집니다.
 *
 * @component
 * @returns {JSX.Element} 토글 스위치 버튼 UI
 */
const ToggleSwitch = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  /**
   * 버튼 클릭 시 호출되는 핸들러.
   * isEditMode 상태를 반전시켜 토글 효과를 만듭니다.
   *
   * @function
   * @returns {void}
   */
  const handleClick = () => {
    setIsEditMode((prev) => !prev); // 상태 토글
  };

  return (
    <button
      onClick={handleClick}
      theme={null}
      className={cn(
        'relative flex h-[30px] w-[70px] items-center justify-end gap-0.5 overflow-hidden rounded-full p-0.5',
        isEditMode ? 'bg-[#181818cc]' : 'scale-x-[-1] bg-neutral-200'
      )}>
      <div className="relative aspect-[1] h-[26px] w-[26px] rounded-full bg-white" />
      <div
        className={cn(
          'font-14-bold absolute left-2.5 top-[calc(50%-10px)] flex h-5 items-center justify-center whitespace-nowrap text-sm',
          isEditMode ? 'text-white' : 'scale-x-[-1] text-gray-400'
        )}>
        {isEditMode ? '편집' : '기본'}
      </div>
    </button>
  );
};

export default ToggleSwitch;
