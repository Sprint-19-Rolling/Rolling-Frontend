import { useState } from 'react';
import Button from '@/components/common/button/Button';
import { cn } from '@/utils/style';

const ToggleSwitch = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = () => {
    setIsEditMode((prev) => !prev); // 상태 토글
  };

  return (
    <Button
      onClick={handleClick}
      theme={null}
      className={cn(
        'relative flex h-[30px] w-[70px] items-center justify-end gap-0.5 overflow-hidden rounded-full p-0.5',
        isEditMode ? 'bg-[#181818cc]' : 'scale-x-[-1] bg-neutral-200'
      )}>
      <div className="relative aspect-[1] h-[26px] w-[26px] rounded-full bg-white" />
      <div
        className={cn(
          'absolute left-2.5 top-[calc(50%-10px)] flex h-5 items-center justify-center whitespace-nowrap text-sm font-bold leading-5',
          isEditMode ? 'text-white' : 'scale-x-[-1] text-[#999999]'
        )}>
        {isEditMode ? '편집' : '기본'}
      </div>
    </Button>
  );
};

export default ToggleSwitch;
