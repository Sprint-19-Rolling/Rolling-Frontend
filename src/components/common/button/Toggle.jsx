import { useState } from 'react';
import Button from '@/components/common/button/Button';

const ToggleSwitch = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = () => {
    setIsEditMode((prev) => !prev); // 상태 토글
  };

  return (
    <>
      {isEditMode ? (
        <Button
          onClick={handleClick}
          className="relative flex h-[30px] w-[70px] items-center justify-end gap-0.5 overflow-hidden rounded-full bg-[#181818cc] p-0.5">
          <div className="relative aspect-[1] h-[26px] w-[26px] rounded-full bg-white" />
          <div className="absolute left-2.5 top-[calc(50%-10px)] flex h-5 items-center justify-center whitespace-nowrap text-sm font-bold leading-5 text-white">
            편집
          </div>
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          className="relative flex h-[30px] w-[70px] scale-x-[-1] items-center justify-end gap-0.5 overflow-hidden rounded-full bg-neutral-200 p-0.5">
          <div className="relative aspect-[1] h-[26px] w-[26px] rounded-full bg-white" />
          <div className="absolute left-2.5 top-[calc(50%-10px)] flex h-5 scale-x-[-1] items-center justify-center whitespace-nowrap text-sm font-bold leading-5 text-[#999999]">
            기본
          </div>
        </Button>
      )}
    </>
  );
};

export default ToggleSwitch;
