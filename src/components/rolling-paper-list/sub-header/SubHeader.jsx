import { useLocation } from 'react-router';
import ShareDropdown from '@/components/common/dropbox/ShareDropdown';
import ProfileGroup from '@/components/common/profile-image/ProfileGroup';
import EmojiPickerButton from '@/components/rolling-paper-list/sub-header/EmojiPickerButton';
import EmojiSummary from '@/components/rolling-paper-list/sub-header/EmojiSummary';
import ToastContainer from '@/components/rolling-paper-list/toast/ToastContainer';
import {
  KAKAO_TEMPLATE_ID,
  SHARE_OPTION_KAKAO,
  SHARE_OPTION_URL,
} from '@/constants/share';
import useError from '@/hooks/useError';
import useReactions from '@/hooks/useReactions';
import useRecipientHeaderData from '@/hooks/useRecipientHeaderData';
import useToast from '@/hooks/useToast';
import { cn } from '@/utils/style';

/**
 * 롤링페이퍼 상세 페이지의 상단 고정 헤더(SubHeader) 컴포넌트입니다.
 * 수신자 정보 표시, 이모지 반응 요약/추가, 공유 드롭다운 등 핵심 인터랙션을 제공합니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {string} props.recipientId - 수신자 정보를 가져올 롤링페이퍼 ID
 * @returns {JSX.Element | null} 로딩 중 (스켈레톤 UI), 에러 상황 (null)을 반환
 */

const SubHeader = ({ recipientId }) => {
  const { error } = useError();
  const { pathname } = useLocation();
  const { recipientData, setRecipientData, loading } =
    useRecipientHeaderData(recipientId);
  const {
    reactions,
    setReactions,
    loading: reactionsLoading,
    pageSize,
  } = useReactions(recipientId);
  const { toasts, showToast, removeToast } = useToast();

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

  const { name, recentMessages, messageCount, topReactions, reactionCount } =
    recipientData;

  const handleEmojiUpdate = (reaction) => {
    // topReacions 객체 낙관적 업데이트
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
        newTopReactions = [...prev.topReactions, reaction];
      }

      const sortTopReactions = newTopReactions
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      return { ...prev, topReactions: sortTopReactions };
    });

    // reactions 배열 낙관적 업데이트
    setReactions((prev) => {
      if (!prev) {
        return [reaction];
      }

      const existingIndex = prev.findIndex((r) => r.emoji === reaction.emoji);
      let updatedReactions;
      if (existingIndex !== -1) {
        updatedReactions = prev.map((r, index) =>
          index === existingIndex ? { ...r, count: reaction.count } : r
        );
      } else {
        updatedReactions = [...prev, reaction];
      }

      const sortedReactions = updatedReactions.sort(
        (a, b) => b.count - a.count
      );

      return sortedReactions.slice(0, pageSize);
    });
  };

  const handleShareSelect = async (item) => {
    switch (item) {
      case SHARE_OPTION_KAKAO: {
        if (window.Kakao?.isInitialized()) {
          try {
            window.Kakao.Share.sendCustom({
              templateId: Number(KAKAO_TEMPLATE_ID),
              templateArgs: {
                PATH: pathname.slice(1),
                NAME: name,
                MESSAGE_COUNT: messageCount,
                REACTION_COUNT: reactionCount,
              },
            });
          } catch {
            showToast('카카오톡 공유 기능에 오류가 발생했습니다.', 'error');
          }
        } else {
          showToast('카카오톡 공유 기능을 사용할 수 없습니다.', 'error');
        }
        break;
      }
      case SHARE_OPTION_URL: {
        const currentUrl = window.location.href;
        try {
          await navigator.clipboard.writeText(currentUrl);
          showToast('URL이 복사 되었습니다.', 'success');
        } catch {
          showToast('URL 복사 실패하였습니다.', 'error');
        }
        break;
      }
      default:
        // 예외 처리
        // eslint-disable-next-line no-console
        console.warn(`알 수 없는 공유 옵션입니다: ${item}`);
    }
  };

  return (
    <>
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
                reactions={reactions}
                loading={reactionsLoading}
                topReactions={topReactions}
              />
              <EmojiPickerButton
                recipientId={recipientId}
                onSuccess={handleEmojiUpdate}
              />
              <div className="divider-style" />
              <ShareDropdown onShareSelect={handleShareSelect} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default SubHeader;
