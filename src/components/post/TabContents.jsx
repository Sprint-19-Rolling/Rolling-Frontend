import { useEffect, useState } from 'react';
import { api } from '@/apis/axios.js';
import icons from '@/assets/icons/icons';

// 컬러칩 배열
const colorChips = [
  'bg-orange-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-green-200',
];

const TabContents = ({ activeTab, selected, onSelect }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'image') {
      setLoading(true);
      api
        .get('/background-images/')
        .then((res) => {
          setImageUrls(res.data.imageUrls || []);
        })
        .catch((err) => {
          console.error('이미지 API 호출 실패:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  if (activeTab === 'image' && loading) {
    return <div className="py-20 text-center">이미지 불러오는 중...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:mx-auto md:w-[720px]">
      {activeTab === 'color' &&
        colorChips.map((color, idx) => {
          const isSelected =
            selected?.type === 'color' && selected?.index === idx;
          return (
            <div
              key={`color-${idx}`}
              onClick={() => onSelect('color', idx, color)}
              className={`relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-[16px] border border-black/10 ${color}`}>
              {isSelected && (
                <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                  <icons.CheckIcon
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
              )}
            </div>
          );
        })}

      {activeTab === 'image' &&
        imageUrls.map((url, idx) => {
          const isSelected =
            selected?.type === 'image' && selected?.index === idx;
          return (
            <div
              key={`image-${idx}`}
              onClick={() => onSelect('image', idx, url)}
              className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[16px] border border-black/10">
              <img
                src={url}
                alt={`이미지칩-${idx}`}
                className={`h-full w-full object-cover transition-opacity duration-200 ${
                  isSelected ? 'opacity-70' : 'opacity-100'
                }`}
              />
              {isSelected && (
                <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                  <icons.CheckIcon
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default TabContents;
