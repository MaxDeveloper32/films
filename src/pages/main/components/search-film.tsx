import { ChangeEvent, useDeferredValue, useState } from 'react';
import { useSearchFilmQuery } from '../../../rtk/endpoints/films/api/api';
import FilmRating from '../../../components/film-rating/film-rating';
import { useCustomDebounce } from '../../../hooks/use-custom-debounce';
import './search-film.css';

const DELAY = 700;

const SearchFilm = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const debouncedValue = useCustomDebounce(deferredQuery, DELAY);
  const {data = [], isFetching, isSuccess,} = useSearchFilmQuery(debouncedValue, {skip: !debouncedValue,});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };


  const hasResults = !!debouncedValue && !isFetching;
  const showNoResults = isSuccess && data.length === 0;

  return (
    <div className="search-film">
      <form className="search-film__form">
        <label className="search-film__label">
          <input
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Поиск фильмов..."
            className="search-film__input"
            aria-label="Поиск фильмов"
          />

          <i className="search-film__icon-wrapper">
            <svg
              className="search-film__icon"
              width={40}
              height={40}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M13.6667 8.74984C13.6667 11.4652 11.4654 13.6665 8.75002 13.6665C6.03462 13.6665 3.83335 11.4652 3.83335 8.74984C3.83335 6.03444 6.03462 3.83317 8.75002 3.83317C11.4654 3.83317 13.6667 6.03444 13.6667 8.74984ZM12.7965 14.5643C11.6494 15.3641 10.2545 15.8332 8.75002 15.8332C4.838 15.8332 1.66669 12.6619 1.66669 8.74984C1.66669 4.83782 4.838 1.6665 8.75002 1.6665C12.662 1.6665 15.8334 4.83782 15.8334 8.74984C15.8334 10.2544 15.3643 11.6494 14.5643 12.7966L17.9672 16.1994L16.1994 17.9672L12.7965 14.5643Z"
              />
            </svg>
          </i>
        </label>
      </form>

      <div className="search-film__content">
        {isFetching && <p>...Loading </p>}
        {showNoResults && <p> По вашему запросу ничего не найдено </p>}

        {hasResults && (
          <ul className="search-film__list">
            {data.map((film) => (
              <li key={film.id} className="search-film__item">
                <div className="search-film__image-block">
                  <img
                    className="search-film__image"
                    src={film.previewImage}
                    alt=""
                    width={200}
                    height={150}
                  />
                </div>
                <div className="search-film__wrapper-info">
                  <div className="search-film__info">
                    <h4 className=""> {film.title} </h4>
                    <div className="">
                      <FilmRating rating={film.rating} />
                      <span> {film.year} </span>
                    </div>
                  </div>

                  <button className="search-film__button-see"> Смотреть </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchFilm;

