import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { cn } from '@/utils/style';

// 탭 구성
const tabs = [
  { key: 'color', label: '컬러', content: '🎨 컬러 콘텐츠가 보여집니다' },
  { key: 'image', label: '이미지', content: '🖼️ 이미지 콘텐츠가 보여집니다' },
];

// 버튼 스타일 정의
const tabButton = cva(
  'flex items-center justify-center font-16-medium transition-all duration-200 rounded-md h-10 w-[118px] md:w-[122px]',
  {
    variants: {
      active: {
        true: 'border-2 border-purple-600 text-purple-700 bg-white',
        false: 'border border-transparent text-black',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const TabButtonBox = ({ initialTab = 'color' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="px-4 py-10">
      {/* 탭 버튼 그룹 */}
      <div className="flex w-fit justify-center rounded-lg bg-gray-100">
        {tabs.map(({ key, label }) => {
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(tabButton({ active: activeTab === key }))}>
              {label}
            </button>
          );
        })}
      </div>

      {/* 선택된 탭 콘텐츠 */}
      <div className="mt-10">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
};

TabButtonBox.propTypes = {
  initialTab: PropTypes.oneOf(['color', 'image']),
};

export default TabButtonBox;
