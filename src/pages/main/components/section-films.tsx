import { useGetFilmsQuery } from '../../../rtk/endpoints/films/api/api';
import FilmsList from './films-list';
import { useAppSelector } from '../../../hooks/use-app-redux/use-app-redux';

import { useMemo, useState } from 'react';
import { selectSortedFilms } from '../../../rtk/selector/films.selector';

const MAX_COUNT_FILM = 5;

const SectionFilms = () => {
  const { isLoading } = useGetFilmsQuery();
  const films = useAppSelector(selectSortedFilms);
  const [ visuallyFilms, setVisuallyFilms ] = useState(MAX_COUNT_FILM);

    const filmsSlice = useMemo(
    () => films.slice(0, visuallyFilms),
    [films, visuallyFilms]
  );
  const isShowMore = films.length > visuallyFilms;

  const handleShowMore = () => {
    setVisuallyFilms((prev) => prev + MAX_COUNT_FILM);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='films-list'>
      <h2 className="films-list__title visually-hidden">All movies. Upcoming</h2>
      <FilmsList films={filmsSlice} />
      { isShowMore && <button className="films-list__show-more" onClick={handleShowMore}>Show more</button>}
    </section>
  );
};


export default SectionFilms;
