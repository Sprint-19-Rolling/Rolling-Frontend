import RelationshipBadge from '@/components/common/badge/RelationshipBadge';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import { cn } from '@/utils/style';

/**
 * @typedef {'친구' | '가족' | '동료' | '지인'} RelationshipType
 */

/**
 * 메시지 작성자의 프로필 정보(이미지, 이름, 관계 뱃지)를 표시하는 컴포넌트입니다.
 * @param {object} props
 * @param {string} props.sender - 메시지 작성자의 이름 (필수)
 * @param {string} props.profileImageURL - 작성자의 프로필 이미지 URL (필수)
 * @param {RelationshipType} props.relationship - 작성자와 수신자 간의 관계 (필수)
 * @param {string} [props.className] - 컴포넌트에 추가될 Tailwind CSS 클래스 (선택)
 * @returns {JSX.Element}
 */

const AuthorInfo = ({ sender, profileImageURL, relationship, className }) => {
  return (
    <div className={cn('flex gap-3.5', className)}>
      <ProfileImage
        src={profileImageURL}
        alt={sender + ' 프로필 이미지'}
        borderColor="gray"
      />
      <div>
        <div className="font-16-regular sm:font-20-regular mb-0.5 flex gap-1.5 leading-6 text-gray-900 sm:mb-1.5">
          <span>From.</span>
          <span className="font-bold">{sender}</span>
        </div>
        <RelationshipBadge type={relationship} />
      </div>
    </div>
  );
};

export default AuthorInfo;
