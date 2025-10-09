import RelationshipBadge from '@/components/common/badge/RelationshipBadge';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import DateText from '@/components/rolling-paper-list/DateText';

const containerStyle =
  'flex justify-between items-center pb-4 border-b border-gray-200 mb-6';
const profileInfoStyle = 'flex items-center gap-2';

/**
 * 모달의 헤더 정보를 표시하는 컴포넌트 (프로필 이미지, 이름, 역할, 날짜)
 */
const ModalHeader = ({ sender, role, date, profileImgUrl }) => {
  return (
    <div className={containerStyle}>
      <div className={profileInfoStyle}>
        <ProfileImage
          src={profileImgUrl}
          alt={`${sender}님의 프로필`}
          size="large"
          borderColor="gray"
        />
        <div className="flex flex-col">
          <p className="font-20-regular sm:font-20-regular text-gray-900">
            From.
            <span className="font-20-bold sm:font-20-bold ml-1">{sender}</span>
          </p>

          {role && (
            <div className="pt-0.5">
              <RelationshipBadge type={role} />
            </div>
          )}
        </div>
      </div>
      <DateText createdAt={date} size="modal" />
    </div>
  );
};

export default ModalHeader;
