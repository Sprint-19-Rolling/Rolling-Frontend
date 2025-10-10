// src/components/post/TabContents.jsx
import { api } from '@/apis/axios';
import useDataFetch from '@/hooks/useDataFetch';
import useError from '@/hooks/useError';
import { cn } from '@/utils/style';
import SelectItem from './TabSelectItem';

const colorChips = ['beige', 'purple', 'blue', 'green'];

const colorClassMap = {
  beige: 'bg-beige-200',
  purple: 'bg-purple-200',
  blue: 'bg-blue-200',
  green: 'bg-green-200',
};

/**
 * @typedef {Object} ImageData
 * @property {string} original
 * @property {string} thumbnail
 */

/**
 * @typedef {Object} TabContentsProps
 * @property {'color'|'image'} activeTab
 * @property {{ type: 'color'|'image', value: string } | null} selected
 * @property {(type: 'color'|'image', index: number, value: string) => void} onSelect
 */

/**
 * @param {TabContentsProps} props
 */
const TabContents = ({ activeTab, selected, onSelect }) => {
  const { setError } = useError();
  const fetchImages = async (signal) => {
    try {
      const res = await api.get('/background-images/', { signal });
      const originals = res.data.imageUrls || [];
      return originals.map((url) => ({
        original: url,
        thumbnail: url.replace(/\/\d+\/\d+$/, '/200/200'),
      }));
    } catch (err) {
      setError(err); // 전역 에러 상태에 전달
      throw err; // useDataFetch에서도 error 상태로 잡히도록
    }
  };

  const shouldFetch = activeTab === 'image';
  const {
    data: imageUrls,
    loading,
    error,
  } = useDataFetch(shouldFetch ? fetchImages : async () => null, [activeTab]);

  if (activeTab === 'image') {
    if (loading) {
      return <div className="py-20 text-center">이미지 불러오는 중...</div>;
    }

    if (error) {
      return (
        <div className="py-20 text-center text-red-500">
          이미지 로딩 실패: {error.message || '알 수 없는 오류'}
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:mx-auto md:w-[720px]">
      {/* 컬러칩 렌더링 */}
      {activeTab === 'color' &&
        colorChips.map((color, idx) => {
          return (
            <SelectItem
              key={`color-${idx}`}
              isSelected={
                selected?.type === 'color' && selected?.value === color
              }
              onClick={() => onSelect('color', idx, color)}
              className={colorClassMap[color]}
            />
          );
        })}

      {/* 이미지 렌더링 */}
      {activeTab === 'image' &&
        imageUrls?.map((img, idx) => {
          return (
            <SelectItem
              key={img.original}
              isSelected={
                selected?.type === 'image' && selected?.value === img.original
              }
              onClick={() => onSelect('image', idx, img.original)}>
              <img
                src={img.thumbnail}
                alt={`배경 이미지-${idx}`}
                className={cn(
                  'h-full w-full object-cover transition-opacity duration-200',
                  selected?.value === img.original
                    ? 'opacity-70'
                    : 'opacity-100'
                )}
                loading="lazy"
              />
            </SelectItem>
          );
        })}
    </div>
  );
};

export default TabContents;
