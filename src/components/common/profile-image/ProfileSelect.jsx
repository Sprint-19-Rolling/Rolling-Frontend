// ProfileSelect.jsx
// 프로필 선택 컴포넌트
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProfileImage from './ProfileImage';

const ProfileSelect = ({ profiles, onSelect }) => {
  const [selectedUrl, setselectedUrl] = useState(null);

  const handleSelect = (url) => {
    setselectedUrl(url);
    onSelect(url);
  };

  return (
    <div className="flex flex-wrap">
      {profiles.map((url) => {
        return (
          <ProfileImage
            key={url}
            src={url}
            size="large"
            isSelected={selectedUrl === url}
            borderColor="gray"
            isClickable={true}
            className="mr-2"
            onClick={() => handleSelect(url)}
          />
        );
      })}
    </div>
  );
};

ProfileSelect.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ProfileSelect;
