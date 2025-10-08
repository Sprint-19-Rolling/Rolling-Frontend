import '@/style/base/modal.css';
import { useEffect } from 'react';
import Button from '@/components/common/button/Button';
import ModalHeader from '@/components/common/ModalHeader';
import PostContent from '@/components/common/PostContent';
import ModalPortal from './ModalPortal';

const footerStyle = 'pt-6 border-t border-gray-200 flex justify-center';
const contentBodyStyle = 'flex-grow overflow-y-auto px-4 py-2';

function Modal({
  isOpen,
  onClose,
  contentHtml,
  sender,
  role,
  profileImgUrl,
  createdAt,
  font,
}) {
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <ModalPortal>
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="modal-container" role="dialog" aria-modal="true">
        <ModalHeader
          sender={sender}
          role={role}
          date={createdAt}
          profileImgUrl={profileImgUrl}
        />

        <div className={contentBodyStyle}>
          <PostContent htmlContent={contentHtml} font={font} />
        </div>

        <div className={footerStyle}>
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
}

export default Modal;
