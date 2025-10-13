import { cva } from 'class-variance-authority';
import { Link } from 'react-router';
import Card from '@/assets/rolling-paper-card/card';
import EmojiBadge from '@/components/common/badge/EmojiBadge';
import ProfileGroup from '@/components/common/profile-image/ProfileGroup';
import Title from '@/components/common/Title';
import { cn } from '@/utils/style';

const cardStyle = cva(
  'relative overflow-hidden rolling-paper-card-style shrink-0 snap-start',
  {
    variants: {
      backgroundColor: {
        beige: 'bg-beige-200',
        purple: 'bg-purple-200',
        blue: 'bg-blue-200',
        green: 'bg-green-200',
      },
    },
  }
);

const RollingPaperCard = ({
  id,
  name,
  messageCount,
  recentMessages,
  topReactions,
  backgroundColor,
  backgroundImageURL,
}) => {
  // 도형 렌더링
  const renderShape = () => {
    // backgroundImageURL이 존재하면 색상 도형 대신 이미지 배경 사용
    if (backgroundImageURL) {
      return null;
    }

    switch (backgroundColor) {
      case 'beige':
        return <Card.Beige />;
      case 'purple':
        return <Card.Purple />;
      case 'blue':
        return <Card.Blue />;
      case 'green':
        return <Card.Green />;
      default:
        return null;
    }
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImageURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundOrigin: 'border-box',
  };

  return (
    <Link
      to={`/post/${id}`}
      className={cn(cardStyle({ backgroundColor }))}
      style={backgroundImageURL && backgroundStyle}>
      {renderShape()}
      {/* 콘텐츠 */}
      <div className="flex flex-col items-start gap-3">
        <Title as="h3" className={backgroundImageURL && 'text-white'}>
          To. {name}
        </Title>
        {recentMessages.length > 0 && (
          <div className="ml-2">
            <ProfileGroup
              recentMessages={recentMessages}
              messageCount={messageCount}
            />
          </div>
        )}
        <span
          className={`font-16-regular ${backgroundImageURL ? 'text-white' : 'text-gray-700'}`}>
          <span className="font-bold">{messageCount}</span>명이 작성했어요!
        </span>
      </div>
      {topReactions.length > 0 && (
        <div className="border-black/12 z-40 w-full border-t pt-4">
          <div className="inline-flex items-start gap-2">
            {topReactions.map((item) => {
              return (
                <EmojiBadge
                  key={item.id}
                  emoji={item.emoji}
                  count={item.count}
                />
              );
            })}
          </div>
        </div>
      )}
    </Link>
  );
};

export default RollingPaperCard;
