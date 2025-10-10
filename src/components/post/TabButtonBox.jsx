// src/components/post/TabButtonBox.jsx
import { useState } from 'react';
import { cn } from '@/utils/style';
import TabContents from './TabContents';

const tabs = [
  { key: 'color', label: '컬러' },
  { key: 'image', label: '이미지' },
];

const tabButton = {
  base: 'flex items-center justify-center font-16-bold transition-all duration-200 rounded-md h-10 w-[118px] md:w-[122px]',
  active: 'border-2 border-purple-600 text-purple-700 bg-white',
  inactive: 'border border-transparent text-black',
};

/**
 * @typedef {Object} TabButtonBoxProps
 * @property {'color'|'image'} [initialTab]
 * @property {(data: { color: string|null, image: string|null }) => void} [onSelectChange]
 */
const TabButtonBox = ({ backgroundData, setBackgroundData }) => {
  const [activeTab, setActiveTab] = useState('color');

  const handleSelect = (type, _index, value) => {
    if (type === 'color') {
      // 같은 색을 클릭하면 기본값으로 리셋
      if (backgroundData.backgroundColor === value) {
        setBackgroundData({
          backgroundColor: 'beige',
          backgroundImageURL: null,
        });
      } else {
        setBackgroundData({
          backgroundColor: value,
          backgroundImageURL: null,
        });
      }
    } else if (type === 'image') {
      // 같은 이미지를 클릭하면 해제
      if (backgroundData.backgroundImageURL === value) {
        setBackgroundData({
          backgroundColor: backgroundData.backgroundColor ?? 'beige',
          backgroundImageURL: null,
        });
      } else {
        setBackgroundData({
          backgroundColor: backgroundData.backgroundColor ?? 'beige',
          backgroundImageURL: value,
        });
      }
    }
  };

  // 현재 선택 상태 계산
  const selected = backgroundData.backgroundImageURL
    ? { type: 'image', value: backgroundData.backgroundImageURL }
    : { type: 'color', value: backgroundData.backgroundColor };
  console.log('선택된 값', selected);

  return (
    <div className="mx-auto w-full max-w-[720px] py-10">
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

      {/* 콘텐츠 영역 */}
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
