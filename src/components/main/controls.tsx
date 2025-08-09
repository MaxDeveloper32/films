import classNames from 'classnames';
import { useUpdateStatusFavoriteMutation } from '../../rtk/endpoints/films/api/api';
import React from 'react';

type ControlsProps = {
  isFavorite: boolean;
  filmId: string;
};

type FilmStatus = Record<string, boolean>;

type ButtonsControls = {
  className: string;
  value: string;
  action: string;
  getActive: (status: FilmStatus) => boolean;
};

const buttonsControls: ButtonsControls[] = [
  {
    className: 'film-card__controls-item--add-to-watch-list',
    value: 'Add to watchList',
    action: 'watchList',
    getActive: (status) => status.watchList,
  },
  {
    className: 'film-card__controls-item--mark-as-watched',
    value: 'Mark as watched',
    action: 'watched',
    getActive: (status) => status.watched,
  },
  {
    className: 'film-card__controls-item--favorite',
    value: 'Mark as favorite',
    action: 'favorite',
    getActive: (status) => status.isFavorite,
  },
];



const handleWatchList = (id: string) => console.log(id);
const handleWatched = (id: string) => console.log(id);

const Controls = ({ isFavorite, filmId }: ControlsProps) => {
  const [updateFavorite] = useUpdateStatusFavoriteMutation();

  const buttonLogic = {
    favorite: () => updateFavorite(filmId),
    watchList: () => handleWatchList(filmId),
    watched: () => handleWatched(filmId),
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const action = e.currentTarget.dataset.action as keyof typeof buttonLogic
    buttonLogic[action]();
  };

  return (
    <>
      {buttonsControls.map(({ className, value, action, getActive }) => {
        return (
          <button
            key={className}
            className={classNames(`film-card__controls-item ${className}`, {
              'film-card__controls-item--active': getActive({ isFavorite }),
            })}
            type="button"
            data-action={action}
            onClick={handleClick}
          >
            {value}
          </button>
        );
      })}
    </>
  );
};

export default Controls;
