import { cva } from 'class-variance-authority';
import DOMPurify from 'dompurify';
import Icons from '@/assets/icons/icons';
import Button from '@/components/common/button/Button';
import AuthorInfo from '@/components/rolling-paper-list/AuthorInfo';
import DateText from '@/components/rolling-paper-list/DateText';
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
 * 롤링페이퍼 목록에서 사용되는 메시지 카드 컴포넌트입니다.
 * 클릭 시 해당 메시지의 상세 모달을 띄웁니다.
 * @param {object} props
 * @param {string} props.sender - 메시지 작성자의 이름
 * @param {string} props.profileImageURL - 작성자의 프로필 이미지 URL
 * @param {string} props.relationship - 작성자와 받는 사람의 관계
 * @param {string} props.createdAt - 메시지가 작성된 날짜
 * @param {string} props.content - 메시지의 본문 내용
 * @param {'Pretendard'|'Noto Sans'|'나눔명조'|'나눔손글씨 손편지체'} props.font - 메시지 내용에 적용할 폰트 변수
 * @param {function} props.onClick - 카드를 클릭했을 때 실행될 핸들러 함수 (모달 열기)
 * @param {boolean} [props.edit=false] - true일 경우 카드 우측 상단에 삭제 버튼을 표시 (편집 모드 시 옵션)
 * @param {function} [props.onDelete] - 삭제 버튼 클릭 시 실행될 핸들러 함수 (편집 모드 시 옵션)
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
  const sanitizedContent = DOMPurify.sanitize(content);
  const plainTextContent = sanitizedContent.replace(/<[^>]*>/g, '');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

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
      <AuthorInfo
        sender={sender}
        profileImageURL={profileImageURL}
        relationship={relationship}
        className={'pb-3.75 border-b border-gray-200'}
      />
      {edit && (
        <Button
          theme="icon"
          size={40}
          onClick={handleDeleteClick}
          className="absolute right-6 top-7">
          <Icons.DeletedIcon />
        </Button>
      )}
      <div className={cn(textStyle({ font }))}>{plainTextContent}</div>
      <DateText className={'mt-auto'} createdAt={createdAt} />
    </div>
  );
};

export default MessageCard;
