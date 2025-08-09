import FilmCard from '../../../components/films-card/films-card';
import { Film } from '../../../types/film.type';
import FilmsListEmpty from './films-list-empty';

type FilmsListProps = {
  films: Film[];
};

const FilmsList = ({ films }: FilmsListProps) => {
  if (!films.length) {
    return <FilmsListEmpty />;
  }

  return (
    <div className="films-list__container">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
};

export default FilmsList;
