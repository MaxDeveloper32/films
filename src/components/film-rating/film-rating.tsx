import classNames from 'classnames';
import { determinesColorRating } from '../../utils/determines-color-rating';

type FilmRatingProps = {
  rating: number;
  top?: boolean;
  className?: string;
}

const FilmRating = ({rating, top, className}: FilmRatingProps) => (
  <p
    className={
      classNames(
        className,
        'film-card__rating',
        {'film-details__total-rating--color-top': top},
        `film-card__rating--${determinesColorRating(rating)}`
      )
    }
  >
    {rating}
  </p>
);

export default FilmRating;
