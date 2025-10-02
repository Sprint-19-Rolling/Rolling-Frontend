import { useState } from 'react';
import { cn } from '@/utils/style';
import TabContents from './TabContents';

/**
 * 탭 구성 정보
 * @type {{ key: 'color'|'image', label: string }[]}
 */
const tabs = [
  { key: 'color', label: '컬러' },
  { key: 'image', label: '이미지' },
];

/**
 * 탭 버튼 스타일 정의
 */
const tabButton = {
  base: 'flex items-center justify-center font-16-bold transition-all duration-200 rounded-md h-10 w-[118px] md:w-[122px]',
  active: 'border-2 border-purple-600 text-purple-700 bg-white',
  inactive: 'border border-transparent text-black',
};

/**
 * TabButtonBox 컴포넌트 props 정의
 * @typedef {Object} TabButtonBoxProps
 * @property {'color'|'image'} [initialTab='color'] - 초기 활성화 탭
 */

/**
 * 탭 버튼과 해당 탭 콘텐츠(TabContents)를 렌더링하는 컴포넌트
 *
 * @param {TabButtonBoxProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <TabButtonBox initialTab="image" />
 */
const TabButtonBox = ({ initialTab = 'color' }) => {
  /**
   * 현재 활성화된 탭 상태
   * @type {'color'|'image'}
   */
  const [activeTab, setActiveTab] = useState(initialTab);

  /**
   * 선택된 요소 상태
   * @type {{ type: 'color'|'image', index: number, value: string } | null}
   */
  const [selected, setSelected] = useState(null);

  /**
   * 항목 선택 핸들러
   * @param {'color'|'image'} type - 선택 항목 타입
   * @param {number} index - 선택 항목 인덱스
   * @param {string} value - 선택 항목 값 (컬러 클래스 또는 이미지 URL)
   */
  const handleSelect = (type, index, value) => {
    if (selected?.type === type && selected?.index === index) {
      setSelected(null); // 다시 클릭하면 선택 해제
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
