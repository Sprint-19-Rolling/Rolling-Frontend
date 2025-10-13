import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('#modal-root element not found. Modal will not render.');
    return null;
  }

  return createPortal(children, modalRoot);
};

export default ModalPortal;
