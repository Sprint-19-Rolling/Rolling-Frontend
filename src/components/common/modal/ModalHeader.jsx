import ProfileImage from '@/components/common/profile-image/ProfileImage';
import DateText from '@/components/rolling-paper-list/DateText';

const containerStyle =
  'flex justify-between items-center pb-4 border-b border-gray-200 mb-6';
const profileInfoStyle = 'flex items-center gap-2';

const badgeBaseStyle =
  'inline-flex items-center justify-center rounded px-2 py-0.5 font-14-regular h-[20px]';

const getBadgeStyle = (relationship) => {
  switch (relationship) {
    case '친구':
      return 'bg-blue-100 text-blue-600';
    case '지인':
      return 'bg-orange-100 text-orange-600';
    case '가족':
      return 'bg-green-100 text-green-600';
    case '동료':
    default:
      return 'bg-red-100 text-red-600';
  }
};

/**
 * 모달의 헤더 정보를 표시하는 컴포넌트 (프로필 이미지, 이름, 역할, 날짜)
 */
const ModalHeader = ({ sender, role, date, profileImgUrl }) => {
  const dynamicBadgeStyle = `${getBadgeStyle(role)} ${badgeBaseStyle}`;

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
              <span className={dynamicBadgeStyle}>{role}</span>
            </div>
          )}
        </div>
      </div>
      <DateText createdAt={date} size="modal" />
    </div>
  );
};

export default ModalHeader;
