import { FilmDetails } from '../../types/film.type';
import { formatMovieDuration } from '../../utils/format-movie-duration';


type TableDetailsProps = {
  filmInfo: FilmDetails;
}


const TableDetails = ({filmInfo}: TableDetailsProps) => {


  if(!filmInfo){
    return;
  }

  return (
    <table className="film-details__table">
      <tbody>
        <tr className="film-details__row">
          <td className="film-details__term">Director</td>
          <td className="film-details__cell">{filmInfo.director}</td>
        </tr>
        <tr className="film-details__row">
          <td className="film-details__term">Writers</td>

          <td className="film-details__cell"> {filmInfo.writers.join(', ')}</td>

        </tr>
        <tr className="film-details__row">
          <td className="film-details__term">Actors</td>
          <td className="film-details__cell"> {filmInfo.actors.join(', ')} </td>
        </tr>
        <tr className="film-details__row">
          <td className="film-details__term">Release Date</td>
          <td className="film-details__cell">30 March 1945</td>
        </tr>
        <tr className="film-details__row">
          <td className="film-details__term">Runtime</td>
          <td className="film-details__cell">{formatMovieDuration(filmInfo.duration)}</td>
        </tr>
        <tr className="film-details__row">
          <td className="film-details__term">Country</td>
          <td className="film-details__cell">USA</td>
        </tr>
        <tr className="film-details__row">
          <td className="film-details__term">Genres</td>
          <td className="film-details__cell">
            {filmInfo.genres.map((genre) => (
              <span key={genre} className="film-details__genre">{genre}</span>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableDetails;
