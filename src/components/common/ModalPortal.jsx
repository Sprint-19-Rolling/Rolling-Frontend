import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ModalPortal({ children }) {
  const [container] = useState(() => document.createElement('div'));

  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    if (!modalRoot) {
      console.error('#modal-root element not found in index.html');
      return;
    }

    modalRoot.appendChild(container);

    return () => {
      modalRoot.removeChild(container);
    };
  }, [container, modalRoot]);

  return createPortal(children, container);
}

export default ModalPortal;
