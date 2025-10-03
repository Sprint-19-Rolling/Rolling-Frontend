import { useState, useEffect } from 'react';
import { api } from '@/apis/axios';
import { cn } from '@/utils/style';
import SelectItem from './TabSelectItem';

const colorChips = [
  'bg-beige-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-green-200',
];

/**
 * @typedef {Object} ImageData
 * @property {string} original - 원본 이미지 URL
 * @property {string} thumbnail - 썸네일
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
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'image' && imageUrls.length === 0) {
      setLoading(true);
      setError(null);

      api
        .get('/background-images/')
        .then((res) => {
          const originals = res.data.imageUrls || [];
          setImageUrls(
            originals.map((url) => ({
              original: url,
              thumbnail: url.replace(/\/\d+\/\d+$/, '/200/200'),
            }))
          );
        })
        .catch(() => setError('이미지를 불러오는 데 실패했습니다.'))
        .finally(() => setLoading(false));
    }
  }, [activeTab, imageUrls.length]);

  if (activeTab === 'image' && loading) {
    return <div className="py-20 text-center">이미지 불러오는 중...</div>;
  }
  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:mx-auto md:w-[720px]">
      {activeTab === 'color' &&
        colorChips.map((color, idx) => {
          return (
            <SelectItem
              key={`color-${idx}`}
              isSelected={
                selected?.type === 'color' && selected?.value === color
              }
              onClick={() => onSelect('color', idx, color)}
              className={color}
            />
          );
        })}

      {activeTab === 'image' &&
        imageUrls.map((img, idx) => {
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
