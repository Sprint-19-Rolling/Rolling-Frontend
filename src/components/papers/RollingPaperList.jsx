import ArrowButton from '@/components/papers/ArrowButton';
import RollingPaperCard from '@/components/papers/rolling-paper-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/rolling-paper-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';

const RollingPaperList = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <div className="rolling-paper-list-style">
        {LIST_LIMIT_ARRAY.map((_, index) => {
          return <RollingPaperCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  return (
    <div className="rolling-paper-list-style relative">
      {data.previous && <ArrowButton position="left" />}
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
        <div className="h-50 font-18-regular flex w-full items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
          롤링페이퍼가 없습니다 😢
        </div>
      )}

      {data.next && <ArrowButton position="right" />}
    </div>
  );
};

export default RollingPaperList;
