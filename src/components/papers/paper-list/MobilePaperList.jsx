import { useRef } from 'react';
import RollingPaperCard from '@/components/papers/paper-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/paper-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const MobilePaperList = ({ sort }) => {
  const observerRef = useRef(null);

  const { data, loading, fetchMore, hasNext, isFetching } = useRollingPaperData(
    sort,
    'mobile'
  );

  useInfiniteScroll({
    targetRef: observerRef,
    hasNext,
    loading,
    isFetching,
    fetchMore,
  });

  return (
    <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth sm:gap-5 lg:hidden">
      {loading || !data
        ? LIST_LIMIT_ARRAY.map((_, idx) => {
            return <RollingPaperCardSkeleton key={idx} />;
          })
        : data.results.map((card) => {
            return (
              <RollingPaperCard
                key={`${sort || 'recent'}-${card.id}`}
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
      {hasNext && <div ref={observerRef} className="w-10 shrink-0" />}
      {isFetching &&
        LIST_LIMIT_ARRAY.slice(0, 2).map((_, idx) => {
          return <RollingPaperCardSkeleton key={`fetch-${idx}`} />;
        })}
    </div>
  );
};

export default MobilePaperList;
