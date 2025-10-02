import { useEffect, useState } from 'react';
import { api } from '@/apis/axios.js';
import SelectItem from './TabSelectItem';

const colorChips = [
  'bg-orange-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-green-200',
];

const TabContents = ({ activeTab, selected, onSelect }) => {
  const [imageUrls, setImageUrls] = useState([]); // [{ original, thumbnail }]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'image' && imageUrls.length === 0) {
      const controller = new AbortController();
      setLoading(true);
      setError(null);

      api
        .get('/background-images/', { signal: controller.signal })
        .then((res) => {
          const originals = res.data.imageUrls || [];
          const mapped = originals.map((url) => ({
            original: url,
            thumbnail: url.replace(/\/\d+\/\d+$/, '/200/200'),
          }));
          setImageUrls(mapped);
        })
        .catch((err) => {
          if (err.name !== 'CanceledError') {
            console.error('이미지 API 호출 실패:', err);
            setError('이미지를 불러오는 데 실패했습니다.');
          }
        })
        .finally(() => setLoading(false));

      return () => controller.abort();
    }
  }, [activeTab]);

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
          const isSelected =
            selected?.type === 'color' && selected?.index === idx;
          return (
            <SelectItem
              key={`color-${idx}`}
              isSelected={isSelected}
              onClick={() => onSelect('color', idx, color)}
              className={color}
            />
          );
        })}

      {activeTab === 'image' &&
        imageUrls.map((img, idx) => {
          const isSelected =
            selected?.type === 'image' && selected?.index === idx;
          return (
            <SelectItem
              key={`image-${idx}`}
              isSelected={isSelected}
              // 👉 원본 URL을 onSelect로 넘김
              onClick={() => onSelect('image', idx, img.original)}>
              <img
                src={img.thumbnail}
                alt={`배경 이미지-${idx}`}
                className={`h-full w-full object-cover transition-opacity duration-200 ${
                  isSelected ? 'opacity-70' : 'opacity-100'
                }`}
                loading="lazy"
              />
            </SelectItem>
          );
        })}
    </div>
  );
};

export default TabContents;
