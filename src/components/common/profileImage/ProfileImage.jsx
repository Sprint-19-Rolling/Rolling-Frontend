// ProfileImage.jsx
// 기본 프로필 1개 컴포넌트

const ProfileImage = ({
  src,
  alt = '프로필이미지',
  size = 'large', // 'large' | 'small'
  borderColor = 'gray', // 'gray' | 'white' | 'purple'
  isSelected = false, // 선택 상태 → 보라색 border 적용
  isClickable = false, // 클릭 가능 여부 (커서 제어)
  margin = '', // 마진 값 직접 컨트롤 (ex: "-mr-2", "ml-1")
  onClick,
}) => {
  const sizeMap = {
    large: 'w-14 h-14', // 56px
    small: 'w-7 h-7', // 28px
  };

  const borderMap = {
    gray: 'border border-gray-200',
    purple: 'border-4 border-purple-500',
    white: 'border-2 border-white',
  };

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`rounded-full object-cover ${sizeMap[size]} ${isSelected ? borderMap['purple'] : borderMap[borderColor]} ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${margin} `}
    />
  );
};

export default ProfileImage;
