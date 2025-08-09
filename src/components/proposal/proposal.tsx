import { useNavigate } from 'react-router-dom';
import './proposal.css';
import Modal from '../modal-window/modal';
import { usePrivateModal } from '../../hooks/use-private-modal';

const Proposal = () => {
  const navigate = useNavigate();
  const { isOpen, isAuth, handleCloseModal, handleOpenModal, handleNavigateReg } = usePrivateModal();

  const handleRedirect = () => {
    if (!isAuth) return handleOpenModal();
    navigate('/shopping');
  };

  return (
    <section className="proposal">
      <div className="wrapper-films proposal__wrapper">
        <div className="proposal__content">
          <h3 className="proposal__title">Фильмы и сериалы, премиум‑телеканалы по подписке</h3>
          <p className="proposal__description">
            Больше возможностей и куча разных товаров и фильмов на выбор навсегда останутся в вашем
            каталоге
          </p>
          <button className="proposal__button buy-button" onClick={handleRedirect}>
            Приобрести товары по клику!
          </button>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} className={'modal-registration'}>
          <h2> Прежде чем перейти на эту страницу нужно пройти регистрацию </h2>
          <div className="modal-registration__wrapper-control">
            <button onClick={handleNavigateReg}> Войти </button>
            <button onClick={handleCloseModal}> Остаться на сайте </button>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Proposal;
