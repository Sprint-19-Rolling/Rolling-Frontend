// Participants.jsx
// 프로필 그룹 컴포넌트
import ProfileImage from './ProfileImage';

const ProfileGroup = ({ participants }) => {
  const visible = participants.slice(0, 3);
  const hiddenCount = participants.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((url, index) => {
        return (
          <ProfileImage
            key={index}
            src={url}
            size="small"
            borderColor="white"
            isSelected={false}
            isClickable={false}
            margin="-ml-2"
          />
        );
      })}
      {/* 3명 이외 인원수 */}
      {hiddenCount > 0 && (
        <div className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-xs font-medium text-gray-600">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default ProfileGroup;
