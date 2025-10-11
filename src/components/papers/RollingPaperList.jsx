import { useEffect, useRef, useState } from 'react';
import { api } from '@/apis/axios';
import ArrowButton from '@/components/common/button/ArrowButton';
import RollingPaperCard from '@/components/papers/RollingPaperCard';

const RollingPaperList = () => {
  const scrollRef = useRef(null);
  const [cardData, setCardData] = useState([]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchRollingPapers = async () => {
      try {
        // 실제 API 엔드포인트로 변경 필요
        const res = await api.get('/rolling-papers');
        const data = res.data;

        const normalizedData = data.map((item) => ({
          ...item,
          topReactions: item.topReactions || {},
          recentMessages: item.recentMessages || [],
        }));

        setCardData(normalizedData);
      } catch (error) {
        console.error('롤링페이퍼 불러오기 실패:', error);
      }
    };

    fetchRollingPapers();
  }, []);

  return (
    <div className="flex w-full justify-center bg-gray-50 py-10">
      <div className="relative flex max-w-[1272px] items-center">
        <ArrowButton position="left" onClick={() => scroll('left')} />

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth px-8">
          {cardData.length > 0 ? (
            cardData.map((card) => {
              return (
                <RollingPaperCard
                  key={card.id}
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
            <div className="text-gray-400">롤링페이퍼가 없습니다 😢</div>
          )}
        </div>

        <ArrowButton position="right" onClick={() => scroll('right')} />
      </div>
    </div>
  );
};

export default RollingPaperList;
