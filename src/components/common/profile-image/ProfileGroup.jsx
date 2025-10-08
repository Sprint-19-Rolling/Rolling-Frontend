import ProfileImage from './ProfileImage';

/**
 * @typedef {Object} MessageParticipant
 * @property {number} id
 * @property {string} profileImageURL
 */

/**
 * 메시지 작성자의 프로필 이미지를 그룹 형태로 표시하고,
 * 숨겨진 참가자 수를 표시하는 컴포넌트입니다.
 * @component
 * @param {object} props
 * @param {Array<MessageParticipant>} props.recentMessages - 화면에 표시할 최근 메시지 작성자 목록 (최대 3개)
 * @param {number} props.messageCount - 롤링페이퍼에 작성된 전체 메시지 개수
 * @returns {JSX.Element} Profile Group 컴포넌트
 */
const ProfileGroup = ({ recentMessages, messageCount }) => {
  const hiddenCount = messageCount - recentMessages.length;

  return (
    <div className="flex items-center">
      {recentMessages.map((item) => {
        return (
          <ProfileImage
            key={item.id}
            src={item.profileImageURL}
            size="small"
            borderColor="white"
            isSelected={false}
            isClickable={false}
            className="-ml-2"
          />
        );
      })}

      {hiddenCount > 0 && (
        <div className="font-12-medium -ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default ProfileGroup;
