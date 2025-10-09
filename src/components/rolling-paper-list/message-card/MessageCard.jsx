import { cva } from 'class-variance-authority';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import Icons from '@/assets/icons/icons';
import Button from '@/components/common/button/Button';
import AuthorInfo from '@/components/rolling-paper-list/AuthorInfo';
import DateText from '@/components/rolling-paper-list/DateText';
import { SANITIZE_CONFIG_MESSAGECARD } from '@/constants/sanitizeConfig';
import { cn } from '@/utils/style';

const textStyle = cva(
  'font-15-regular sm:font-18-regular line-clamp-2 text-gray-600 sm:line-clamp-3',
  {
    variants: {
      font: {
        Pretendard: 'font-sans',
        'Noto Sans': 'ff-noto',
        나눔명조: 'ff-nanum-myeongjo',
        '나눔손글씨 손편지체': 'ff-nanum-sonpyeonji',
      },
    },
  }
);

/**
 * 🎴 롤링페이퍼 목록에서 사용되는 메시지 카드 컴포넌트입니다.
 * 클릭 시 해당 메시지의 상세 모달이 열립니다.
 *
 * - 카드 내부에서는 텍스트 일부만 미리보기로 보여주며,
 *   이미지(img) 태그만 예외적으로 표시되도록 설정했습니다.
 * - HTML 본문 전체는 모달 내부(PostContent)에서 렌더링됩니다.
 */
const MessageCard = ({
  sender,
  profileImageURL,
  relationship,
  createdAt,
  content,
  font,
  onClick,
  edit = false,
  onDelete,
}) => {
  // 메시지 본문을 안전하게 정제 (img 태그만 허용)
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content, SANITIZE_CONFIG_MESSAGECARD),
    [content]
  );

  // 키보드 접근성 (Enter 또는 Space로 클릭 동작)
  const handleKeyDown = (e) => {
    if (edit) {
      return;
    } // 편집 모드에서는 클릭 방지
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  // 삭제 버튼 클릭 시 상위 클릭 이벤트 전파 방지 후 onDelete 실행
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        'card-style relative flex-col items-start gap-4 p-6 pt-7 transition',
        !edit && 'cursor-pointer hover:shadow-lg active:scale-[0.99]'
      )}
      onClick={!edit ? onClick : undefined} // 편집 모드에서는 클릭 차단
      onKeyDown={handleKeyDown}
      aria-label={`${sender}님의 메시지 보기`}
      title={`${sender}님의 메시지 보기`}>
      {/* 작성자 정보 */}
      <AuthorInfo
        sender={sender}
        profileImageURL={profileImageURL}
        relationship={relationship}
        className="pb-3.75 border-b border-gray-200"
      />

      {/* 편집 모드 시 삭제 버튼 표시 */}
      {edit && (
        <Button
          theme="icon"
          size={40}
          onClick={handleDeleteClick}
          className="absolute right-6 top-7"
          aria-label="메시지 삭제"
          title="메시지 삭제">
          <Icons.DeletedIcon />
        </Button>
      )}

      {/* 메시지 내용 (텍스트 일부 + 이미지 허용) */}
      <div
        className={cn(textStyle({ font }))}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* 작성 날짜 */}
      <DateText className="mt-auto" createdAt={createdAt} />
    </div>
  );
};

export default MessageCard;
