// ProfileSelector.jsx
// 프로필 선택 컴포넌트

import { useState } from 'react';
import ProfileImage from './ProfileImage';

const ProfileSelector = ({ profiles, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (url) => {
    setSelected(url);
    onSelect(url);
  };

  return (
    <div className="flex flex-wrap">
      {profiles.map((url, index) => {
        return (
          <ProfileImage
            key={index}
            src={url}
            size="large"
            isSelected={selected === url}
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

export default ProfileSelector;
