import { cva } from 'class-variance-authority';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import Icons from '@/assets/icons/icons';
import Button from '@/components/common/button/Button';
import AuthorInfo from '@/components/rolling-paper-list/AuthorInfo';
import DateText from '@/components/rolling-paper-list/DateText';
import SANITIZE_CONFIG from '@/utils/sanitizeConfig';
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
 * @param {object} props
 * @param {string} props.sender - 메시지 작성자 이름
 * @param {string} props.profileImageURL - 작성자 프로필 이미지 URL
 * @param {string} props.relationship - 작성자와 받는 사람의 관계
 * @param {string} props.createdAt - 메시지 작성 날짜
 * @param {string} props.content - 메시지 본문 내용 (HTML 포함 가능)
 * @param {'Pretendard'|'Noto Sans'|'나눔명조'|'나눔손글씨 손편지체'} props.font - 메시지 내용 폰트
 * @param {function} props.onClick - 카드 클릭 시 실행되는 함수 (모달 열기)
 * @param {boolean} [props.edit=false] - 편집 모드 여부 (true일 경우 삭제 버튼 표시)
 * @param {function} [props.onDelete] - 삭제 버튼 클릭 시 실행되는 함수 (편집 모드 전용)
 * @returns {JSX.Element}
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
  //  메시지 본문 내용을 안전하게 정제 (XSS 방지)
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content, SANITIZE_CONFIG),
    [content]
  );

  //  키보드 접근성 (Enter 또는 Space로 클릭 동작)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  //  삭제 버튼 클릭 시 상위 클릭 이벤트 전파 방지 후 onDelete 실행
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="card-style relative cursor-pointer flex-col items-start gap-4 p-6 pt-7"
      onClick={onClick}
      onKeyDown={handleKeyDown}>
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
          className="absolute right-6 top-7">
          <Icons.DeletedIcon />
        </Button>
      )}

      {/* 메시지 내용 */}
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
