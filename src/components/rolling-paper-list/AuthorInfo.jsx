import PropTypes from 'prop-types';
import RelationshipBadge from '@/components/common/badge/RelationshipBadge';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import { cn } from '@/utils/style';

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

AuthorInfo.propTypes = {
  sender: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string.isRequired,
  relationship: PropTypes.oneOf(['친구', '가족', '동료', '지인']).isRequired,
};

export default AuthorInfo;
