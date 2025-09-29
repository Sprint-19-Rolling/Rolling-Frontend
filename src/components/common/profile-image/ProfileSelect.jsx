// ProfileSelector.jsx
// 프로필 선택 컴포넌트
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProfileImage from './ProfileImage';

const ProfileSelector = ({ profiles, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (url) => {
    setSelectedId(url);
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
            isSelected={selectedId === url}
            borderColor="gray"
            isClickable={true}
            margin="mr-2"
            onClick={() => handleSelect(url)}
          />
        );
      })}
    </div>
  );
};

ProfileSelector.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ProfileSelector;
