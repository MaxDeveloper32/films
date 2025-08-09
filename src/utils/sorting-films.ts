import { Film } from '../types/film.type';

type SortFunction = (films: Film[]) => Film[];


const TypeByFilter = {
  AllMovies: 'allMovies',
  Favorites: 'favorites',
  Watchlist: 'watchlist',
  History: 'history'
};


const filterFilms: Record<string, SortFunction> = {
  [TypeByFilter.AllMovies]: (films) => [...films],
  [TypeByFilter.Favorites]: (films) => [...films].filter((film) => film.isFavorite),
};


const Sort = {
  Default: 'default',
  Date: 'date',
  Rating: 'rating',
};


const sortFilms: Record<string, SortFunction> = {
  [Sort.Default]: (films) => [...films],
  [Sort.Date]: (films) => films.toSorted((a, b) => b.year - a.year),
  [Sort.Rating]: (films) => films.toSorted((a, b) => b.rating - a.rating),
};


const filtersMovies = (films: Film[], key: string) => {
  const filterFunc = filterFilms[key] ?? filterFilms[TypeByFilter.AllMovies];
  return filterFunc(films);
};


const sortingFilms = (films: Film[], key: string) => {
  const sortFunc = sortFilms[key] ?? sortFilms[Sort.Default];
  return sortFunc(films);
};


export { filtersMovies, sortingFilms };

