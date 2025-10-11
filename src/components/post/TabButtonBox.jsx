// src/components/post/TabButtonBox.jsx
import { useState } from 'react';
import Title from '@/components/common/Title';
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
 * @typedef {Object} Selection
 * @property {'color'|'image'} type
 * @property {string} value
 *
 * @typedef {Object} TabButtonBoxProps
 * @property {'color'|'image'} [initialTab]
 * @property {(selection: Selection|null) => void} onSelectChange
 */
const TabButtonBox = ({ onSelectChange }) => {
  const [activeTab, setActiveTab] = useState('color');
  const [selected, setSelected] = useState({
    type: 'color',
    value: 'beige',
  });

  const handleSelect = (type, _index, value) => {
    if (type === 'color') {
      // 같은 색을 클릭하면 기본값으로 리셋
      if (selected.type === 'color' && selected.value === value) {
        const newSelection = { type: 'color', value: 'beige' };
        setSelected(newSelection);
        onSelectChange(newSelection);
      } else {
        const newSelection = { type: 'color', value };
        setSelected(newSelection);
        onSelectChange(newSelection);
      }
    } else if (type === 'image') {
      // 같은 이미지를 클릭하면 해제 (기본 컬러로)
      if (selected.type === 'image' && selected.value === value) {
        const newSelection = { type: 'color', value: 'beige' };
        setSelected(newSelection);
        onSelectChange(newSelection);
      } else {
        const newSelection = { type: 'image', value };
        setSelected(newSelection);
        onSelectChange(newSelection);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-[720px] py-10">
      <Title>배경화면을 선택해 주세요.</Title>
      <p className="font-16-regular color-gray-500 mt-1">
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </p>
      <div className="mt-6 flex w-fit justify-center rounded-lg bg-gray-100">
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
