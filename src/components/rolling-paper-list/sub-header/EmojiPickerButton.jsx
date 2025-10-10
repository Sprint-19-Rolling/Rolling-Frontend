import EmojiPicker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { postReaction } from '@/apis/reactions';
import icons from '@/assets/icons/icons';
import Button from '@/components/common/button/Button';
import { useClickOutside } from '@/hooks/useClickOutside';
import useError from '@/hooks/useError';

/**
 * 이모티콘 선택창(Picker)을 토글하고, 이모지 선택 시 서버에 반응을 등록하는 버튼 컴포넌트입니다.
 * 등록 성공 후 서버 응답을 부모에게 전달하여 UI를 갱신합니다.
 * @param {object} props - 컴포넌트의 props
 * @param {string} props.recipientId - 반응을 등록할 롤링페이퍼 수신자의 ID
 * @param {function(): void} [props.onSuccess] - 이모지 등록 성공 후 호출될 콜백 함수, 서버가 반환한 갱신된 이모지 객체를 인수로 받음
 * @returns {JSX.Element}
 */
const EmojiPickerButton = ({ recipientId, onSuccess }) => {
  const { setError } = useError();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  const handleTogglePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const postEmojiAsync = async (emojiData) => {
    try {
      const updatedReactions = await postReaction(recipientId, emojiData.emoji);
      onSuccess?.(updatedReactions);
    } catch (err) {
      setError({
        status: err.response?.status || 500,
        message: err.response?.data?.message || '이모지 등록에 실패했습니다.',
      });
    }
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        aria-label="이모티콘 추가 버튼"
        theme="outlined"
        size={36}
        className="sm:w-22 h-8 w-9 px-0 sm:h-9"
        onClick={handleTogglePicker}>
        <icons.AddIcon />
        <span className="hidden sm:inline">추가</span>
      </Button>
      <div className="absolute right-[-60px] top-full z-50 mt-1.5 sm:right-0">
        <EmojiPicker
          searchPlaceHolder="이모티콘 검색"
          open={isOpen}
          onEmojiClick={postEmojiAsync}
          emojiStyle="apple"
          width={310}
          height={400}
          lazyLoadEmojis={true}
        />
      </div>
    </div>
  );
};

export default EmojiPickerButton;
