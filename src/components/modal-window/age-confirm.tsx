import Modal from './modal';
import './age-confirm-modal.css';

type AgeConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
}

const AgeConfirmModal = ({isOpen, onClose, onConfirm}: AgeConfirmModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} className='age-confirm-modal wrapper-films'>
    <h2 className='age-confirm-modal__title'> Этот фильм содержит сцены 18+ </h2>
    <p className='age-confirm-modal__description'>Вам исполнилось  18 лет ? </p>

    <div className='age-confirm-modal__control'>
      <button onClick={() => onConfirm(true)}>Да</button>
      <button onClick={() => onConfirm(false)}>Нет</button>
    </div>


  </Modal>
);

export default AgeConfirmModal;

