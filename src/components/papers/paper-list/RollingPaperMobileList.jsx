import { useRef } from 'react';
import RollingPaperCard from '@/components/papers/rolling-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/rolling-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const RollingPaperMobileList = ({
  data,
  loading,
  isFetching,
  nextUrl,
  fetchMore,
}) => {
  const scrollRef = useRef(null);
  const observerRef = useRef(null);

  useInfiniteScroll({
    targetRef: observerRef,
    rootRef: scrollRef,
    hasNext: !!nextUrl,
    loading,
    isFetching,
    fetchMore,
  });

  return (
    <>
      {loading || !data ? (
        // ⏳ 로딩 상태일 때 — 스켈레톤 카드
        <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto lg:hidden">
          {LIST_LIMIT_ARRAY.map((_, idx) => {
            return <RollingPaperCardSkeleton key={idx} />;
          })}
        </div>
      ) : (
        // 📄 데이터 렌더링
        <div
          ref={scrollRef}
          className="scrollbar-hide flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth lg:hidden">
          {data.results.length > 0 ? (
            <>
              {data.results.map((card) => {
                return (
                  <div key={card.id} className="flex-shrink-0 snap-start">
                    <RollingPaperCard
                      id={card.id}
                      name={card.name}
                      messageCount={card.messageCount}
                      recentMessages={card.recentMessages}
                      topReactions={card.topReactions}
                      backgroundColor={card.backgroundColor}
                      backgroundImageURL={card.backgroundImageURL}
                    />
                  </div>
                );
              })}
              {/* 👇 무한 스크롤 트리거 */}
              <div ref={observerRef} className="h-full w-10 flex-shrink-0" />
            </>
          ) : (
            // 📭 데이터 없음 상태
            <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
              롤링페이퍼가 없습니다 😢
            </div>
          )}

          {isFetching && (
            <div className="flex w-20 items-center justify-center text-gray-400">
              ...
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RollingPaperMobileList;
