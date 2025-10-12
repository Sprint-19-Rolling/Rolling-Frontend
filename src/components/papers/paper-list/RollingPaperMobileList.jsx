import { useRef, useState } from 'react';
import RollingPaperCard from '@/components/papers/rolling-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/rolling-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const RollingPaperMobileList = ({ data, loading, onNext }) => {
  const scrollRef = useRef(null);
  const rightEndRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMore = async () => {
    if (!data?.next || isFetching) {
      return;
    }
    setIsFetching(true);
    try {
      await onNext(); // ✅ 다음 페이지 데이터 가져오기
    } finally {
      setIsFetching(false);
    }
  };

  useInfiniteScroll({
    targetRef: rightEndRef,
    rootRef: scrollRef,
    hasNext: !!data?.next,
    loading,
    isFetching,
    fetchMore,
  });

  const listContainerStyle =
    'scrollbar-hide flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth lg:hidden';

  return (
    <>
      {loading || !data ? (
        <div className={listContainerStyle}>
          {LIST_LIMIT_ARRAY.map((_, idx) => {
            return <RollingPaperCardSkeleton key={idx} />;
          })}
        </div>
      ) : (
        <div ref={scrollRef} className={listContainerStyle}>
          {data.results.length > 0 ? (
            <>
              {data.results.map((card) => {
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
              })}
              <div ref={rightEndRef} className="h-full w-2 flex-shrink-0" />
            </>
          ) : (
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
