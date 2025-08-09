import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider-films.css';

import { useGetPopularFilmsQuery } from '../../../rtk/endpoints/films/api/api';
import classNames from 'classnames';
import { useState } from 'react';
import Modal from '../../modal-window/modal';

import { determinesColorRating } from '../../../utils/determines-color-rating';
import { useAgeVerification } from '../../../hooks/use-age-verification';
import AgeConfirmModal from '../../modal-window/age-confirm';
import { Film } from '../../../types/film.type';
import FilmCardInfo from '../../film-card-info/film-card-info';

const SliderFilms = () => {
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const { isOpen, handleAgeConfirm, handleCloseModal, handleOpenModal, isAgeConfirmOpen } =
    useAgeVerification();
  const { data: popularFilms = [] } = useGetPopularFilmsQuery();

  const handleOpenFilm = (film: Film) => {
    setSelectedFilm(film.id);
    handleOpenModal(film.ageRating);
  };

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={5}
        spaceBetween={30}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        className="films-swiper"
      >
        {popularFilms.map((film) => (
          <SwiperSlide key={film.id}>
            <li className="films-swiper__item" onClick={() => handleOpenFilm(film)}>
              <div className="films-swiper__image-block">
                <img src={film.previewImage} alt="" width={250} height={290} />
              </div>
              <span
                className={classNames(
                  'films-swiper__rating',
                  { 'films-swiper__rating--top': film.top },
                  `films-swiper__rating--${determinesColorRating(film.rating)}`
                )}
              >
                {film.rating}
              </span>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev"></button>
      <button className="swiper-button-next"></button>
      <div className="swiper-pagination"></div>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {selectedFilm && <FilmCardInfo id={selectedFilm} onClose={handleCloseModal} />}
      </Modal>

      <AgeConfirmModal
        isOpen={isAgeConfirmOpen}
        onClose={() => handleAgeConfirm(false)}
        onConfirm={handleAgeConfirm}
      />
    </div>
  );
};

export default SliderFilms;
