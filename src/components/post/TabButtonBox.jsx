//TabButtonBox 컴포넌트

import { useState } from 'react';
import { cn } from '@/utils/style';
import TabContents from './TabContents';

// 탭 구성
const tabs = [
  { key: 'color', label: '컬러' },
  { key: 'image', label: '이미지' },
];

// 버튼 스타일 정의
const tabButton = {
  base: 'flex items-center justify-center font-16-bold transition-all duration-200 rounded-md h-10 w-[118px] md:w-[122px]',
  active: 'border-2 border-purple-600 text-purple-700 bg-white',
  inactive: 'border border-transparent text-black',
};

const TabButtonBox = ({ initialTab = 'color' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // 선택된 요소 상태: { type: 'color' | 'image', index: number, value: string }
  const [selected, setSelected] = useState(null);

  const handleSelect = (type, index, value) => {
    if (selected?.type === type && selected?.index === index) {
      setSelected(null); // 다시 클릭하면 해제
    } else {
      setSelected({ type, index, value }); // 새로운 선택
    }
  };

  return (
    <div className="mx-auto w-full max-w-[720px] py-10">
      {/* 탭 버튼 그룹 */}
      <div className="flex w-fit justify-center rounded-lg bg-gray-100">
        {tabs.map(({ key, label }) => {
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                tabButton.base,
                activeTab === key ? tabButton.active : tabButton.inactive
              )}
              type="button">
              {label}
            </button>
          );
        })}
      </div>

      {/* 선택된 탭 콘텐츠 */}
      <div className="mt-10">
        <TabContents
          activeTab={activeTab}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default TabButtonBox;
