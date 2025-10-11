import EmojiBadge from '@/components/common/badge/EmojiBadge';
import ProfileGroup from '@/components/common/profile-image/ProfileGroup';

/**
 * 롤링페이퍼 카드 컴포넌트
 */
const RollingPaperCard = ({
  name = 'Sowon',
  messageCount = 30,
  recentMessages = [],
  reactions = { like: 20, love: 12, sad: 7 },
  bgColor = 'bg-purple-200',
  accentColor = 'bg-purple-300/40',
}) => {
  return (
    <div
      className={`relative h-64 w-72 overflow-hidden rounded-2xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-black/10 ${bgColor}`}>
      <div className="absolute bottom-0 right-0 h-36 w-36 overflow-hidden">
        <div
          className={`absolute left-0 top-[6px] h-44 w-80 ${accentColor} rounded-[90.5px]`}
        />
      </div>

      {/* 콘텐츠 */}
      <div className="absolute left-[24px] top-[30px] flex flex-col items-start justify-start gap-11">
        {/* 이름 + 프로필 */}
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="font-['Pretendard'] text-2xl font-bold leading-9 text-neutral-900">
            To. {name}
          </div>

          {/* 프로필 그룹 */}
          <ProfileGroup
            recentMessages={recentMessages}
            messageCount={messageCount}
          />

          {/* 작성자 수 */}
          <div className="font-['Pretendard'] text-base font-normal leading-relaxed text-neutral-700">
            <span className="font-bold">{messageCount}</span>명이 작성했어요!
          </div>
        </div>

        {/* EmojiBadge */}
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="h-px w-56 bg-black/10" />
          <div className="inline-flex items-start justify-start gap-2">
            <EmojiBadge emoji="👍" count={reactions.like} />
            <EmojiBadge emoji="😍" count={reactions.love} />
            <EmojiBadge emoji="😢" count={reactions.sad} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollingPaperCard;
