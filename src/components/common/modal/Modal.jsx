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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
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
        className="fixed left-1/2 top-1/2 z-[1001] flex h-[476px] w-[600px] shrink-0 -translate-x-1/2 -translate-y-1/2 flex-col rounded-[16px] bg-white p-5 shadow-lg"
        role="dialog"
        aria-modal="true">
        <ModalHeader
          sender={sender}
          role={role}
          date={createdAt}
          profileImgUrl={profileImgUrl}
        />

        <div className="flex-grow overflow-y-auto px-4 py-2">
          <PostContent htmlContent={contentHtml} font={font} />
        </div>

        <div className="flex justify-center border-t border-gray-200 pt-6">
          <Button
            onClick={onClose}
            theme="primary"
            size={56}
            className="w-full max-w-[150px]">
            확인
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
