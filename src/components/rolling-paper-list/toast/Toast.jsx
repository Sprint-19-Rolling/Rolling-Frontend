import { useEffect } from 'react';
import icons from '@/assets/icons/icons';

const ICON_MAP = {
  success: <icons.CompletedIcon className="text-green-500" />,
  error: <icons.AlertIcon className="text-red-500" />,
};

/**
 * Toast 메시지 컴포넌트입니다.
 * 지정된 시간(3초) 후에 자동으로 닫히며, 사용자가 수동으로 닫을 수도 있습니다.
 *
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {(string | number)} props.id - 토스트 메시지의 고유 ID (자동 닫힘 처리에 사용됨)
 * @param {'success' | 'error'} [props.type='success'] - 토스트 메시지의 유형 아이콘과 색상을 결정합니다.
 * @param {string} props.message - 사용자에게 표시할 메시지 내용
 * @param {(id: number) => void} props.onClose - 토스트를 닫을 때 호출되는 콜백 함수. 닫을 토스트의 ID를 인수로 받습니다.
 * @returns {JSX.Element} 토스트 UI 컴포넌트
 */
const Toast = ({ id, type = 'success', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="px-7.5 fixed bottom-[88px] left-1/2 flex h-[64px] w-[calc(100%-40px)] -translate-x-1/2 items-center gap-3 rounded-lg bg-black/80 sm:bottom-[70px] sm:w-[524px]">
      {ICON_MAP[type]}
      <span className="font-16-regular flex-auto text-white">{message}</span>
      <button
        aria-label="토스트 메세지 닫기"
        type="button"
        className="cursor-pointer text-gray-200"
        onClick={() => onClose(id)}>
        <icons.CloseIcon />
      </button>
    </div>
  );
};

export default Toast;
