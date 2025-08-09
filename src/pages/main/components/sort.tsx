import classNames from 'classnames';
import { useState } from 'react';
import { setSortType } from '../../../rtk/slice/films/films.slice';
import { useAppDispatch } from '../../../hooks/use-app-redux/use-app-redux';

type SortType = 'default' | 'date' | 'rating';
type ButtonsType = { type:SortType; label: string }

const Buttons: ButtonsType[] = [
  {type: 'default', label: 'Sort by default'},
  {type: 'date', label: 'Sort by date'},
  {type: 'rating', label: 'Sort by rating'},
];


const Sort = () => {
  const dispatch = useAppDispatch();
  const [selectType, setSelectType] = useState<SortType>('default');

  const handleSortCLick = (type: SortType) => {
    setSelectType(type);
    dispatch(setSortType(type));
  };

  return (
    <ul className="sort">
      {Buttons.map(({ type, label }) => (
        <li key={type}>
          <button
            className={
              classNames(
                'sort__button',
                {'sort__button--active': selectType === type}
              )
            }
            onClick={() => handleSortCLick(type)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );

};

export default Sort;

