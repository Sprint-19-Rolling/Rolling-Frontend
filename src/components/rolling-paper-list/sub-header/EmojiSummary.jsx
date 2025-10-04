import { useRef, useState } from 'react';
import Icons from '@/assets/icons/icons';
import EmojiBadge from '@/components/common/badge/EmojiBadge';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/style';

/**
 * @typedef {Object} ReactionItem
 * @property {number} id - 이모지 ID
 * @property {string} emoji - 이모지 문자열
 * @property {number} count - 이모지 총 개수
 */

/**
 * 선택된 이모지 반응의 요약(최대 3개)을 표시하고, 클릭 시 목록(최대 8개)을 토글하는 컴포넌트입니다.
 * 외부 클릭 감지 (useClickOutside)를 통해 드롭다운을 닫습니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {string} [props.className] - 외부에서 전달된 CSS 클래스
 * @param {Array<ReactionItem>} props.topReactions - 화면에 표시할 요약 이모지 목록 (빈 배열일 경우 null 반환)
 * @param {Array<ReactionItem> | null} [props.reacions] - 드롭다운에 표시할 이모지 목록
 * @param {boolean} props.loading - 전체 이모지 목록 로딩 상태
 * @returns {JSX.Element | null}
 */
const EmojiSummary = ({ className, topReactions, reacions, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  if (topReactions.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('relative flex items-center gap-1', className)}
      ref={ref}>
      {topReactions.map((item) => {
        return (
          <EmojiBadge
            size="s"
            key={item.id}
            emoji={item.emoji}
            count={item.count}
            className={'sm:font-16-regular sm:h-[36px] sm:px-3 sm:py-2'}
          />
        );
      })}
      <button type="button" className="cursor-pointer" onClick={handleClick}>
        {isOpen ? (
          <Icons.ArrowTopIcon className="m-1" />
        ) : (
          <Icons.ArrowDownIcon />
        )}
      </button>
      {isOpen && (
        <div
          className={cn(
            `shadow-basic absolute right-0 top-full mt-[7px] grid w-[312px] grid-cols-4 gap-2 rounded-lg border border-gray-300 bg-white p-6`
          )}>
          {loading ? (
            <span className="col-span-4 text-center">로딩중...</span>
          ) : reacions && reacions.length > 0 ? (
            reacions.map((item) => {
              return (
                <EmojiBadge
                  key={item.id}
                  size="s"
                  emoji={item.emoji}
                  count={item.count}
                />
              );
            })
          ) : (
            <span className="col-span-4 text-center text-gray-500">
              데이터를 불러올 수 없습니다.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default EmojiSummary;
