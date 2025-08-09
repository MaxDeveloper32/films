import Controls from '../main/controls';
import Modal from '../modal-window/modal';

import { formatMovieDuration } from '../../utils/format-movie-duration';
import { Film } from '../../types/film.type';
import { useAgeVerification } from '../../hooks/use-age-verification';
import AgeConfirmModal from '../modal-window/age-confirm';
import FilmRating from '../film-rating/film-rating';
import FilmCardInfo from '../film-card-info/film-card-info';

const FilmCard = ({ film }: { film: Film }) => {
  const { isOpen, handleAgeConfirm, handleCloseModal, handleOpenModal, isAgeConfirmOpen } =
    useAgeVerification();

  return (
    <>
      <article className="film-card" onClick={() => handleOpenModal(film.ageRating)}>
        <h3 className="film-card__title">{film.title}</h3>
        <FilmRating rating={film.rating} />
        <p className="film-card__info">
          <span className="film-card__year">{film.year}</span>
          <span className="film-card__duration">{formatMovieDuration(film.duration)}</span>
          <span className="film-card__genre">{film.genre}</span>
        </p>
        <img src={film.previewImage} alt="" className="film-card__poster" />
        <p className="film-card__description">{film.description}</p>
        <a className="film-card__comments">5 comments</a>
        <div className="film-card__controls">
          <Controls key={film.id} filmId={film.id} isFavorite={film.isFavorite} />
        </div>
      </article>

      <AgeConfirmModal
        isOpen={isAgeConfirmOpen}
        onClose={() => handleAgeConfirm(false)}
        onConfirm={handleAgeConfirm}
      />

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <FilmCardInfo id={film.id} onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default FilmCard;
