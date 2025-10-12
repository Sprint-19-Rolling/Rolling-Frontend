import ArrowButton from '@/components/papers/ArrowButton';
import RollingPaperCard from '@/components/papers/rolling-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/rolling-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';

const RollingPaperDesktopList = ({ data, loading, onNext, onPrev }) => {
  if (loading || !data) {
    return (
      <div className="rolling-paper-list-style hidden lg:flex">
        {LIST_LIMIT_ARRAY.map((_, index) => {
          return <RollingPaperCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  return (
    <div className="rolling-paper-list-style relative hidden lg:flex">
      {/* 왼쪽 화살표 */}
      {data.previous && <ArrowButton position="left" onClick={onPrev} />}

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
        <div className="h-50 font-18-regular flex w-full items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
          롤링페이퍼가 없습니다 😢
        </div>
      )}

      {/* 오른쪽 화살표 */}
      {data.next && <ArrowButton position="right" onClick={onNext} />}
    </div>
  );
};

export default RollingPaperDesktopList;
