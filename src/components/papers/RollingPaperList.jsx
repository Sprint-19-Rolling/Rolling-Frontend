import { useRef } from 'react';
import ArrowButton from '@/components/common/button/ArrowButton';
import RollingPaperCard from '@/components/papers/RollingPaperCard';

const RollingPaperList = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const cardData = [
    {
      id: 1,
      name: 'Sowon',
      bgColor: 'bg-purple-200',
      accentColor: 'bg-purple-300/40',
      shapeType: 'pill', // 알약형
    },
    {
      id: 2,
      name: 'Yerin',
      bgColor: 'bg-orange-200',
      accentColor: 'bg-orange-300/40',
      shapeType: 'square', // 둥근 사각형
    },
    {
      id: 3,
      name: 'Eunha',
      bgColor: 'bg-sky-200',
      accentColor: 'bg-sky-300/40',
      shapeType: 'triangle', // 둥근 삼각형
    },
    {
      id: 4,
      name: 'SinB',
      bgColor: 'bg-green-200',
      accentColor: 'bg-green-300/30',
      shapeType: 'pill', // 알약형
    },
  ];

  return (
    <div className="flex w-full justify-center bg-gray-50 py-10">
      <div className="relative flex max-w-[1272px] items-center">
        <ArrowButton position="left" onClick={() => scroll('left')} />

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth px-8">
          {cardData.map((card) => {
            return (
              <RollingPaperCard
                key={card.id}
                name={card.name}
                messageCount={30}
                recentMessages={[
                  { id: 1, profileImageURL: 'https://placehold.co/54x54' },
                  { id: 2, profileImageURL: 'https://placehold.co/42x32' },
                  { id: 3, profileImageURL: 'https://placehold.co/32x48' },
                ]}
                reactions={{ like: 20, love: 12, sad: 7 }}
                bgColor={card.bgColor}
                accentColor={card.accentColor}
                shapeType={card.shapeType}
              />
            );
          })}
        </div>

        <ArrowButton position="right" onClick={() => scroll('right')} />
      </div>
    </div>
  );
};

export default RollingPaperList;
