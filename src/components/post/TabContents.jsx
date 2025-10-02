import { useEffect, useState } from 'react';
import { api } from '@/apis/axios.js';
import { cn } from '@/utils/style';
import SelectItem from './TabSelectItem';

/**
 * 색상 선택용 TailwindCSS 클래스 배열
 * @type {string[]}
 */
const colorChips = [
  'bg-beige-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-green-200',
];

/**
 * 이미지 데이터 객체 타입
 * @typedef {Object} ImageData
 * @property {string} original - 원본 이미지 URL
 * @property {string} thumbnail - 썸네일 이미지 URL (200x200)
 */

/**
 * TabContents 컴포넌트 props 정의
 * @typedef {Object} TabContentsProps
 * @property {'color'|'image'} activeTab - 현재 활성화된 탭
 * @property {{ type: 'color'|'image', index: number } | null} selected - 현재 선택된 항목 정보
 * @property {(type: 'color'|'image', index: number, value: string) => void} onSelect - 항목 선택 시 호출되는 콜백
 */

/**
 * 탭에 따라 색상 또는 이미지 선택 UI를 렌더링하는 컴포넌트
 *
 * @param {TabContentsProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <TabContents
 *   activeTab="color"
 *   selected={{ type: 'color', index: 0 }}
 *   onSelect={(type, idx, value) => console.log(type, idx, value)}
 * />
 */
const TabContents = ({ activeTab, selected, onSelect }) => {
  /**
   * API에서 가져온 이미지 URL 목록
   * @type {ImageData[]}
   */
  const [imageUrls, setImageUrls] = useState([]);

  /** 로딩 상태 */
  const [loading, setLoading] = useState(false);

  /** 에러 상태 */
  const [error, setError] = useState(null);

  // 이미지 탭 활성화 시 API 호출
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
            thumbnail: url.replace(/\/\d+\/\d+$/, '/200/200'), // 썸네일 변환
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

      return () => controller.abort(); // 컴포넌트 언마운트 시 요청 취소
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
              onClick={() => onSelect('image', idx, img.original)}>
              <img
                src={img.thumbnail}
                alt={`배경 이미지-${idx}`}
                className={cn(
                  'h-full w-full object-cover transition-opacity duration-200',
                  isSelected ? 'opacity-70' : 'opacity-100'
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
