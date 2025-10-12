import ArrowButton from '@/components/common/button/ArrowButton';
import RollingPaperCard from '@/components/papers/RollingPaperCard';
import MessageCardSkeleton from '@/components/rolling-paper-list/message-card/MessageCardSkeleton';

const RollingPaperList = ({ data, loading }) => {
  // 추후 수정 필요
  if (loading || !data) {
    return (
      <div className="flex w-full justify-between">
        {[1, 2, 3, 4].map((item) => {
          return <MessageCardSkeleton key={item} />;
        })}
      </div>
    );
  }

  return (
    <div className="relative flex w-full justify-between">
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
