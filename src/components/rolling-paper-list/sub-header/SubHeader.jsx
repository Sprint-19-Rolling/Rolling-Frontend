import ProfileGroup from '@/components/common/profile-image/ProfileGroup';
import EmojiPickerButton from '@/components/rolling-paper-list/sub-header/EmojiPickerButton';
import EmojiSummary from '@/components/rolling-paper-list/sub-header/EmojiSummary';
import useError from '@/hooks/useError';
import useRecipientHeaderData from '@/hooks/useRecipientHeaderData';
import { cn } from '@/utils/style';

const SubHeader = ({ recipientId }) => {
  const { error } = useError();
  const { recipientData, setRecipientData, loading } =
    useRecipientHeaderData(recipientId);

  if (error) {
    return null;
  }

  if (loading || !recipientData) {
    return (
      <div className="wrapper-px h-17 flex items-center justify-start bg-white">
        <div className={cn('content card-skeleton-style w-full p-5')} />
      </div>
    );
  }

  const handleEmojiUpdate = (reaction) => {
    setRecipientData((prev) => {
      if (!prev) {
        return prev;
      }

      const existing = prev.topReactions.find(
        (r) => r.emoji === reaction.emoji
      );
      let newTopReactions;

      if (existing) {
        newTopReactions = prev.topReactions.map((r) =>
          r.emoji === reaction.emoji ? { ...r, count: reaction.count } : r
        );
      } else {
        newTopReactions = [
          ...prev.topReactions,
          { emoji: reaction.emoji, count: reaction.count },
        ];
      }
      return { ...prev, topReactions: newTopReactions };
    });
  };

  const { name, recentMessages, messageCount, topReactions } = recipientData;

  return (
    <div className="sm:wrapper-px border-divider sticky left-0 top-[65px] z-50 border-b bg-white">
      <div className="content min-h-17 grid grid-cols-1 items-center justify-between sm:flex sm:gap-4">
        <div className="min-w-0 grow border-b border-gray-200 px-4 py-3 sm:border-b-0 sm:p-0">
          <h2 className="sm:font-28-bold font-18-bold truncate text-gray-800">
            To. {name}
          </h2>
        </div>
        <div className="flex items-center gap-7">
          <div className="hidden w-fit gap-[11px] lg:flex">
            {messageCount === 0 ? (
              <span className="font-18-regular text-gray-500">
                아직 메세지가 없어요
              </span>
            ) : (
              <>
                <ProfileGroup
                  recentMessages={recentMessages}
                  messageCount={messageCount}
                />
                <span className="font-18-regular whitespace-nowrap text-gray-900">
                  <span className="font-bold">{messageCount}</span>명이
                  작성했어요!
                </span>
              </>
            )}
          </div>
          <div className="divider-style hidden lg:block" />
          <div className="flex w-full items-center justify-between gap-[15px] px-5 py-2 sm:w-fit sm:gap-[13px] sm:p-0">
            <EmojiSummary
              className="mr-auto sm:-mr-[5px]"
              topReactions={[...topReactions]
                .sort((a, b) => b.count - a.count)
                .slice(0, 3)}
            />
            <EmojiPickerButton
              recipientId={recipientId}
              onSuccess={handleEmojiUpdate}
            />
            <div className="divider-style" />
            {/* TODO: 공유드롭다운 추가 예정 */}
            <button className="h-[32px] w-[36px] border sm:h-[36px] sm:w-[56px]">
              공유
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
