import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../../rtk/api.store';
import { State } from '../../types/state.type';

type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export type { AppDispatch, State };
export { useAppDispatch, useAppSelector };
