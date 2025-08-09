import { useGetFilmsDetailsQuery } from '../../rtk/endpoints/films/api/api';
import { useEffect } from 'react';
import Controls from '../main/controls';
import PreLoading from '../loader/pre-loading';
import TableDetails from '../film-details/table-details';
import FilmRating from '../film-rating/film-rating';

type FilmCardInfoProps = {
  id: string;
  onClose: () => void;
};

const FilmCardInfo = ({ id, onClose }: FilmCardInfoProps) => {
  const { data: filmInfo, isLoading, isError } = useGetFilmsDetailsQuery(id);

  useEffect(() => {
    if (isError) {
      onClose();
    }
  }, [isError, onClose]);

  if (isLoading) {
    return <PreLoading />;
  }

  if (!filmInfo) {
    return;
  }

  return (
    <section className="film-details">
      <form className="film-details__inner" action="" method="get">
        <div className="film-details__top-container">
          <div className="film-details__close">
            <button className="film-details__close-btn" type="button" onClick={onClose}>
              close
            </button>
          </div>
          <div className="film-details__info-wrap">
            <div className="film-details__poster">
              <img className="film-details__poster-img" src={filmInfo.previewImage} alt="" />

              <p className="film-details__age">{`${filmInfo.ageRating}+`}</p>
            </div>

            <div className="film-details__info">
              <div className="film-details__info-head">
                <div className="film-details__title-wrap">
                  <h3 className="film-details__title">{filmInfo.title}</h3>
                  <p className="film-details__title-original">Original: The Great Flamarion</p>
                </div>

                <div className="film-details__rating">
                  <FilmRating rating={filmInfo.rating} top={filmInfo.top} />

                  {filmInfo.top && (
                    <div className="film-details__top-rating film-details__total-rating--color-top">
                      <span className="styles_listTitle__9G9Q9">топ 250</span>
                      <span className="styles_position__pm10U">лучший</span>
                    </div>
                  )}
                </div>
              </div>

              <TableDetails filmInfo={filmInfo} />
              <p className="film-details__film-description">{filmInfo.description}</p>
            </div>
          </div>

          <section className="film-details__controls">
            <Controls key={filmInfo.id} filmId={filmInfo.id} isFavorite={filmInfo.isFavorite} />
          </section>
        </div>
      </form>
    </section>
  );
};

export default FilmCardInfo;
