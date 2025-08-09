import classNames from 'classnames';
import { useEffect, useRef, ReactNode, useCallback} from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}


const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }


    if(isOpen){
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }else{
      dialog.close();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };

  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={classNames(
        'modal',
        'wrapper-films',
        className
      )}
      onClose={handleClose}
    >
      {children}
    </dialog>,
    document.body
  );

};

export default Modal;
