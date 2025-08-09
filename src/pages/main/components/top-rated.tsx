import { useAppSelector } from '../../../hooks/use-app-redux/use-app-redux';
import { selectTopRatedFilms } from '../../../rtk/selector/films.selector';

import FilmsList from './films-list';

const TopRated = () => {
  const topRated = useAppSelector(selectTopRatedFilms);

  return (
    <section className="films-list films-list--extra">
      <h2 className="films-list__title">Top rated</h2>
      <FilmsList films={topRated}/>
    </section>
  );
};

export default TopRated;

