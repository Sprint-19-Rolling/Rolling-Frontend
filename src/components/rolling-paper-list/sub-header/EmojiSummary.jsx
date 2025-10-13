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
 * 선택된 이모지 반응의 요약(최대 3개)을 표시하고, 클릭 시 목록을 토글하는 컴포넌트입니다.
 * 외부 클릭 감지 (useClickOutside)를 통해 드롭다운을 닫습니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {string} [props.className] - 외부에서 전달된 CSS 클래스
 * @param {Array<ReactionItem>} props.topReactions - 화면에 표시할 요약 이모지 목록 (빈 배열일 경우 null 반환)
 * @param {Array<ReactionItem> | null} [props.reactions] - 드롭다운에 표시할 이모지 목록
 * @param {boolean} props.loading - 전체 이모지 목록 로딩 상태
 * @returns {JSX.Element | null}
 */

const EmojiSummary = ({
  className,
  topReactions,
  reactions,
  loading,
  onNext,
  hasNext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  if (!Array.isArray(topReactions) || topReactions.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('relative flex items-center gap-1', className)}
      ref={ref}>
      {topReactions.map((item) => {
        return (
          <EmojiBadge
            size="lg"
            key={`${item.id}-top`}
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
            'shadow-basic absolute left-0 top-full mt-[7px] p-4 sm:left-auto sm:right-0 md:p-6',
            'w-[203px] sm:w-[248px] md:w-[312px]',
            'flex flex-col items-center gap-2 rounded-lg border border-gray-300 bg-white',
            hasNext && 'pb-2 md:pb-2'
          )}>
          <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-4">
            {loading ? (
              <span className="col-span-3 text-center md:col-span-4">
                로딩중...
              </span>
            ) : reactions && reactions.length > 0 ? (
              reactions.map((item) => {
                return (
                  <EmojiBadge
                    key={`${item.id}-dropdown`}
                    size="lg"
                    emoji={item.emoji}
                    count={item.count}
                  />
                );
              })
            ) : (
              <span className="col-span-3 text-center text-gray-500 md:col-span-4">
                데이터를 불러올 수 없습니다.
              </span>
            )}
          </div>
          {hasNext && (
            <button
              type="button"
              aria-label="이모지 불러오기"
              className="cursor-pointer"
              onClick={onNext}>
              <Icons.ArrowDownIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmojiSummary;
