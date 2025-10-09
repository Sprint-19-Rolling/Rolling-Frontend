import { useEffect } from 'react';
import Button from '@/components/common/button/Button';
import ModalHeader from '@/components/common/modal/ModalHeader';
import PostContent from '@/components/common/modal/PostContent';
import ModalPortal from './ModalPortal';

const Modal = ({
  isOpen,
  onClose,
  contentHtml,
  sender,
  role,
  profileImgUrl,
  createdAt,
  font,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[1000] bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="tablet:w-[500px] mobile:w-[90vw] mobile:h-auto fixed left-1/2 top-1/2 z-[1001] flex h-[476px] max-h-[90vh] w-[600px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[16px] bg-white p-5 shadow-lg"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}>
        <ModalHeader
          sender={sender}
          role={role}
          date={createdAt}
          profileImgUrl={profileImgUrl}
        />

        <div className="flex-grow overflow-y-auto px-4 py-2">
          <PostContent htmlContent={contentHtml} font={font} />
        </div>

        <div className="flex justify-center pt-6">
          <Button
            onClick={onClose}
            theme="primary"
            size={56}
            className="font-pretendard flex h-[40px] w-[120px] items-center justify-center gap-[10px] rounded-[6px] border-0 bg-[#9935FF] text-[16px] font-bold leading-[26px] tracking-[-0.16px] text-white transition-all duration-150 hover:bg-[#8a2fe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a29cc] active:bg-[#7a29cc] disabled:cursor-default disabled:bg-gray-300 disabled:text-white">
            확인
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
