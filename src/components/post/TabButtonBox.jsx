// src/components/post/TabButtonBox.jsx
import { useState, useEffect } from 'react';
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
const TabButtonBox = ({ initialTab = 'color', onSelectChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selected, setSelected] = useState(null);

  const handleSelect = (type, index, value) => {
    if (selected?.type === type && selected?.index === index) {
      setSelected(null);
    } else {
      setSelected({ type, index, value });
    }
  };

  useEffect(() => {
    if (!onSelectChange) {
      return;
    }

    if (!selected) {
      // 선택이 없으면 기본값만
      onSelectChange({ color: 'beige', image: null });
    } else if (selected.type === 'color') {
      // 컬러 선택 시
      onSelectChange({ color: selected.value, image: null });
    } else if (selected.type === 'image') {
      // 이미지 선택 시 기존 컬러 유지
      onSelectChange((prev) => ({
        color: prev?.color ?? 'beige',
        image: selected.value,
      }));
    }
  }, [selected, onSelectChange]);

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
