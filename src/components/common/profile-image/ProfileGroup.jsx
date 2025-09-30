// ProfileGroup.jsx
// 프로필 그룹 컴포넌트
import PropTypes from 'prop-types';
import ProfileImage from './ProfileImage';

const ProfileGroup = ({ participants }) => {
  const visible = participants.slice(0, 3);
  const hiddenCount = participants.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((url) => {
        return (
          <ProfileImage
            key={url}
            src={url}
            size="small"
            borderColor="white"
            isSelected={false}
            isClickable={false}
            className="-ml-2"
          />
        );
      })}

      {hiddenCount > 0 && (
        <div className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white font-12-medium text-gray-600">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

ProfileGroup.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProfileGroup;
