import Card from '@/assets/rolling-paper-card/card';
import EmojiBadge from '@/components/common/badge/EmojiBadge';
import ProfileGroup from '@/components/common/profile-image/ProfileGroup';

const RollingPaperCard = ({
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
        return (
          <img
            src={Card.Beige}
            alt="beige card"
            className="absolute inset-0 h-full w-full object-cover"
          />
        );
      case 'purple':
        return (
          <img
            src={Card.Purple}
            alt="purple card"
            className="absolute inset-0 h-full w-full object-cover"
          />
        );
      case 'blue':
        return (
          <img
            src={Card.Blue}
            alt="blue card"
            className="absolute inset-0 h-full w-full object-cover"
          />
        );
      case 'green':
        return (
          <img
            src={Card.Green}
            alt="green card"
            className="absolute inset-0 h-full w-full object-cover"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative h-64 w-72 overflow-hidden rounded-2xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-black/10"
      style={
        backgroundImageURL
          ? {
              backgroundImage: `url(${backgroundImageURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }>
      {backgroundImageURL && <div className="absolute inset-0 bg-black/10" />}
      {renderShape()}

      {/* 콘텐츠 */}
      <div className="absolute left-[24px] top-[30px] z-10 flex flex-col items-start gap-11">
        <div className="flex flex-col items-start gap-3">
          {name && (
            <div className="font-['Pretendard'] text-2xl font-bold leading-9 text-neutral-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              To. {name}
            </div>
          )}

          {recentMessages && recentMessages.length > 0 && (
            <ProfileGroup
              recentMessages={recentMessages}
              messageCount={messageCount}
            />
          )}

          {typeof messageCount === 'number' && (
            <div className="font-['Pretendard'] text-base text-neutral-800">
              <span className="font-bold">{messageCount}</span>명이 작성했어요!
            </div>
          )}
        </div>

        {topReactions && Object.keys(topReactions).length > 0 && (
          <div className="flex flex-col items-start gap-4">
            <div className="h-px w-56 bg-black/10" />
            <div className="inline-flex items-start gap-2">
              {topReactions.like && (
                <EmojiBadge emoji="👍" count={topReactions.like} />
              )}
              {topReactions.love && (
                <EmojiBadge emoji="😍" count={topReactions.love} />
              )}
              {topReactions.sad && (
                <EmojiBadge emoji="😢" count={topReactions.sad} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RollingPaperCard;
