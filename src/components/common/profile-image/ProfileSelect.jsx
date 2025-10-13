// ProfileSelect.jsx
// 프로필 선택 컴포넌트
import { useState } from 'react';
import ProfileImage from './ProfileImage';

/**
 * 프로필 선택 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string[]} props.profiles - 프로필 이미지 URL 배열
 * @param {(url: string) => void} props.onSelect - 선택한 프로필 URL을 전달하는 콜백 함수
 * @returns {JSX.Element}
 */
const ProfileSelect = ({ profiles, onSelect }) => {
  const [selectedUrl, setselectedUrl] = useState(null);

  /**
   * 프로필 선택 처리
   * @param {string} url - 선택된 프로필 이미지 URL
   */
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

export default ProfileSelect;
