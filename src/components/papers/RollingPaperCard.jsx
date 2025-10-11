import EmojiBadge from '@/components/common/badge/EmojiBadge';
import ProfileGroup from '@/components/common/profile-image/ProfileGroup';

/**
 * 롤링페이퍼 카드 컴포넌트
 * - 서버에서 전달된 데이터를 기반으로 렌더링
 * - accentColor는 backgroundColor를 기준으로 자동 계산
 * - backgroundImageURL이 있을 경우 이미지 배경 적용
 */
const RollingPaperCard = ({
  //id, RollingPaperList 에서 key로 사용 eslint 경고만 끄는 주석
  name,
  messageCount,
  recentMessages,
  topReactions,
  backgroundColor,
  accentColor,
  backgroundImageURL,
  shapeType = 'pill',
}) => {
  // 배경색 기준으로 accentColor 계산
  const derivedAccentColor =
    accentColor ||
    (backgroundColor?.includes('purple')
      ? 'bg-purple-300/40'
      : backgroundColor?.includes('orange')
        ? 'bg-orange-300/40'
        : backgroundColor?.includes('sky')
          ? 'bg-sky-300/40'
          : backgroundColor?.includes('green')
            ? 'bg-green-300/40'
            : 'bg-gray-300/30');

  // 도형 렌더링
  const renderShape = () => {
    switch (shapeType) {
      case 'pill':
        return (
          <div className="absolute bottom-0 right-0 h-36 w-36 overflow-hidden">
            <div
              className={`absolute left-0 top-[6px] h-44 w-80 ${derivedAccentColor} rounded-[90.5px]`}
            />
          </div>
        );
      case 'square':
        return (
          <div className="absolute bottom-0 right-0 h-36 w-36 overflow-hidden">
            <div
              className={`absolute bottom-0 right-0 ${derivedAccentColor} h-full w-full rounded-tl-[40px]`}
            />
          </div>
        );
      case 'triangle':
        return (
          <div className="absolute bottom-0 right-0 h-36 w-36 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="absolute bottom-0 right-0 h-full w-full"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 5 
                   Q55 10 85 80 
                   Q87 85 82 90 
                   Q18 90 13 80 
                   Q45 10 50 5 Z"
                className={derivedAccentColor.replace('bg-', 'fill-')}
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative h-64 w-72 overflow-hidden rounded-2xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-black/10 ${
        backgroundImageURL ? '' : backgroundColor
      }`}
      style={
        backgroundImageURL
          ? {
              backgroundImage: `url(${backgroundImageURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }>
      {/* 이미지 오버레이 */}
      {backgroundImageURL && <div className="absolute inset-0 bg-black/10" />}

      {renderShape()}

      {/* 콘텐츠 */}
      <div className="absolute left-[24px] top-[30px] z-10 flex flex-col items-start gap-11">
        {/* 이름 & 프로필 */}
        <div className="flex flex-col items-start gap-3">
          {name && (
            <div className="font-['Pretendard'] text-2xl font-bold leading-9 text-neutral-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              To. {name}
            </div>
          )}

          {recentMessages && (
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

        {/* 리액션 표시 */}
        {topReactions && (
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
