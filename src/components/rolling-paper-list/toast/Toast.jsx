import { cva } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import icons from '@/assets/icons/icons';
import {
  AUTO_CLOSE_DELAY,
  FADE_OUT_DURATION,
  ICON_MAP,
} from '@/constants/toast';
import { cn } from '@/utils/style';

const toastStyles = cva(
  'px-7.5 flex h-[64px] w-[calc(100%-40px)] items-center gap-3 rounded-lg bg-black/80 sm:w-[524px]',
  {
    variants: {
      state: {
        enter: 'animate-fadeIn',
        leave: 'animate-fadeOut',
      },
    },
  }
);

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
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLeaving(true), AUTO_CLOSE_DELAY);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (isLeaving) {
      const timer = setTimeout(() => onClose(id), FADE_OUT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isLeaving, id, onClose]);

  return (
    <div className={cn(toastStyles({ state: isLeaving ? 'leave' : 'enter' }))}>
      <span role="img" aria-label={type}>
        {ICON_MAP[type]}
      </span>
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
