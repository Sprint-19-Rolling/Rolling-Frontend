import ArrowButton from '@/components/papers/ArrowButton';
import RollingPaperCard from '@/components/papers/paper-card/RollingPaperCard';
import RollingPaperCardSkeleton from '@/components/papers/paper-card/RollingPaperCardSkeleton';
import { LIST_LIMIT_ARRAY } from '@/constants/list';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const DesktopPaperList = ({ sort }) => {
  const { data, loading, goNext, goPrev } = useRollingPaperData(
    sort,
    'desktop'
  );

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
      {/* 왼쪽 화살표 */}
      {data.previous && <ArrowButton position="left" onClick={goPrev} />}

      {/* 카드 리스트 */}
      {data.results.length > 0 ? (
        data.results.map((card) => {
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
        })
      ) : (
        <div className="h-50 font-18-regular flex w-full items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
          롤링페이퍼가 없습니다 😢
        </div>
      )}

      {/* 오른쪽 화살표 */}
      {data.next && <ArrowButton position="right" onClick={goNext} />}
    </div>
  );
};

export default DesktopPaperList;
