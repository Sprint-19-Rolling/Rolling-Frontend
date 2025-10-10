import Toast from '@/components/rolling-paper-list/toast/Toast';

/**
 * Toast 메시지 목록을 관리하고 화면에 표시하는 컨테이너 컴포넌트입니다.
 * 모든 토스트 메시지를 화면 하단 중앙에 스택 형태로 배치합니다.
 *
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {Array<Object>} props.toasts - 현재 활성화된 토스트 메시지 객체 목록
 * @param {function(string | number): void} props.removeToast - 토스트 ID를 받아 해당 토스트를 목록에서 제거하는 함수
 * @returns {JSX.Element} 토스트 메시지 컨테이너
 */
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-[88px] left-1/2 z-[2000] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-[70px]">
      {toasts.map((toast) => {
        return <Toast key={toast.id} {...toast} onClose={removeToast} />;
      })}
    </div>
  );
};

export default ToastContainer;
