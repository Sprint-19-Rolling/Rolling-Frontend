import PropTypes from 'prop-types';
import RelationshipBadge from '@/components/common/badge/RelationshipBadge';
import ProfileImage from '@/components/common/profile-image/ProfileImage';

const AuthorInfo = ({ sender, profileImageURL, relationship }) => {
  return (
    <div className="flex gap-3.5">
      <ProfileImage
        src={profileImageURL}
        alt={sender + ' 프로필 이미지'}
        borderColor="gray"
      />
      <div>
        <div className="font-20-regular mb-1.5 flex gap-1.5 leading-6">
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
  relationship: PropTypes.string.isRequired,
};

export default AuthorInfo;
