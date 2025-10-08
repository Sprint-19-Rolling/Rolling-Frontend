import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ModalPortal({ children }) {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
      // eslint-disable-next-line no-console
      console.error('#modal-root element not found in index.html');
      return;
    }

    modalRoot.appendChild(container);

    return () => {
      modalRoot.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
}

export default ModalPortal;
