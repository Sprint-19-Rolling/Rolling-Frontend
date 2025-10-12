import { useRef } from 'react';
import ArrowButton from '@/components/papers/ArrowButton';
import RollingPaperCard from '@/components/papers/rolling-paper-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/rolling-paper-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const RollingPaperDesktopList = ({
  data,
  loading,
  isFetching,
  nextUrl,
  fetchMore,
  onNext,
  onPrev,
}) => {
  const observerRef = useRef(null);

  useInfiniteScroll({
    targetRef: observerRef,
    hasNext: !!nextUrl,
    loading,
    isFetching,
    fetchMore,
  });

  if (loading || !data) {
    return (
      <div className="rolling-paper-list-style grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {LIST_LIMIT_ARRAY.map((_, index) => {
          return <RollingPaperCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  return (
    <div className="rolling-paper-list-style relative grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* 데스크탑 화살표 (lg 이상) */}
      {data.previous && (
        <div className="absolute left-[-50px] top-1/2 hidden -translate-y-1/2 lg:block">
          <ArrowButton position="left" onClick={onPrev} />
        </div>
      )}

      {/* 카드 리스트 */}
      {data.results.length > 0 ? (
        data.results.map((card) => {
          return (
            <RollingPaperCard
              key={card.id}
              id={card.id}
              name={card.name}
              messageCount={card.messageCount}
              recentMessages={card.recentMessages}
              topReactions={card.topReactions}
              backgroundColor={card.backgroundColor}
              backgroundImageURL={card.backgroundImageURL}
            />
          );
        })
      ) : (
        <div className="h-50 font-18-regular col-span-full flex w-full items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
          롤링페이퍼가 없습니다 😢
        </div>
      )}

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="col-span-full h-8 w-full" />

      {/* 로딩 중 표시 */}
      {isFetching && (
        <div className="col-span-full w-full py-4 text-center text-gray-400">
          로딩중...
        </div>
      )}

      {/* 오른쪽 화살표 */}
      {data.next && (
        <div className="absolute right-[-50px] top-1/2 hidden -translate-y-1/2 lg:block">
          <ArrowButton position="right" onClick={onNext} />
        </div>
      )}
    </div>
  );
};

export default RollingPaperDesktopList;
