import { createSelector } from '@reduxjs/toolkit';
import { filmsApi } from '../endpoints/films/api/api';
import { filtersMovies, sortingFilms } from '../../utils/sorting-films';
import { State } from '../../types/state.type';

const selectFilmsData = filmsApi.endpoints.getFilms.select();
const selectSortType = (state: State) => state.film.activeSort;
const selectFilterType = (state: State) => state.film.activeFilter;


const selectSortedFilms = createSelector(
  [selectFilmsData, selectSortType, selectFilterType],
  (filmsResult, sortType, filterType) => {
    const films = filmsResult.data ?? [];
    const filterFilms = filtersMovies(films, filterType);
    return sortingFilms(filterFilms, sortType);
  }
);

const selectTopRatedFilms = createSelector(
  [selectFilmsData],
  (filmsResult) => {
    const films = filmsResult.data || [];
    return [...films].toSorted((a, b) => b.rating - a.rating).slice(0, 2);
  }
);

export { selectSortedFilms, selectTopRatedFilms };

