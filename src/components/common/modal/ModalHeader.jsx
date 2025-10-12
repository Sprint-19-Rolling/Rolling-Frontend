import AuthorInfo from '@/components/rolling-paper-list/AuthorInfo';
import DateText from '@/components/rolling-paper-list/DateText';

/**
 * 모달 상단 헤더 컴포넌트
 * 작성자 정보(프로필, 이름, 관계)와 작성 날짜를 표시합니다.
 *
 * @param {object} props
 * @param {string} props.sender - 작성자 이름
 * @param {string} props.role - 관계 (친구, 가족, 동료, 지인)
 * @param {string} props.date - 작성 날짜
 * @param {string} props.profileImgUrl - 프로필 이미지 URL
 */
const ModalHeader = ({ sender, role, date, profileImgUrl }) => {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
      <AuthorInfo
        sender={sender}
        profileImageURL={profileImgUrl}
        relationship={role}
      />
      <DateText createdAt={date} size="modal" />
    </div>
  );
};

export default ModalHeader;
