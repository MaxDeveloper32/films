import { useAppDispatch, useAppSelector } from '../../hooks/use-app-redux/use-app-redux';
import { useGetFavoritesQuery } from '../../rtk/endpoints/films/api/api';
import React from 'react';
import { setFilterType } from '../../rtk/slice/films/films.slice';
import classNames from 'classnames';


const MainNavigation = () => {
  const {data: favorites = []} = useGetFavoritesQuery();
  const currentFavorites = useAppSelector((state) => state.film.activeFilter);
  const dispatch = useAppDispatch();

  const navigationItems = [
    { label: 'All movies', action: 'allMovies', count: null },
    { label: 'Watchlist', action: 'watchlist', count: 0 },
    { label: 'History', action: 'history', count: 0 },
    { label: 'Favorites', action: 'favorites', count: favorites.length },
  ];


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const action = e.currentTarget.dataset.navigation;
    if(action){
      dispatch(setFilterType(action));
    }
  };

  return (
    <section className="main-navigation">
      <div className="main-navigation__items">
        {navigationItems.map(({action, count, label}) => (
          <button
            key={action}
            className= {classNames(
              ' main-navigation__item',
              {'main-navigation__item--active': currentFavorites === action }
            )}
            data-navigation= {action}
            onClick={handleClick}
          >
            {label}
            {count !== null && <span className="main-navigation__item-count">{count}</span>}
          </button>
        ))}

      </div>
      <button className="main-navigation__additional">
        Stats
      </button>
    </section>
  );
};

export default MainNavigation;
