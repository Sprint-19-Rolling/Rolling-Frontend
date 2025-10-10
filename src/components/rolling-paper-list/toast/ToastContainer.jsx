import Toast from '@/components/rolling-paper-list/toast/Toast';
import useToast from '@/hooks/useToast';

/**
 * 전역 Toast 메시지 목록을 구독하고 화면에 표시하는 컨테이너 컴포넌트입니다.
 * useToast 훅을 통해 활성화된 토스트 목록을 가져와 화면 하단 중앙에 스택 형태로 배치합니다.
 *
 * @component
 * @returns {JSX.Element} 토스트 메시지 컨테이너
 */
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-[88px] left-1/2 z-[2000] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-[70px]">
      {toasts.map((toast) => {
        return <Toast key={toast.id} {...toast} onClose={removeToast} />;
      })}
    </div>
  );
};

export default ToastContainer;
