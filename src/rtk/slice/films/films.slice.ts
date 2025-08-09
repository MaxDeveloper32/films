import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type SortType = 'default' | 'date' | 'rating';

type FilmState = {
  activeSort: SortType;
  activeFilter: string;
  status: string | null;
}

const initialState: FilmState = {
  activeSort: 'default',
  activeFilter:  'allMovies',
  status: null,
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.activeSort = action.payload;
    },
    setFilterType: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    setError(state, action: PayloadAction<{message: string}>) {
      state.status = action.payload.message;
    },
  },
});

export const { setSortType, setFilterType, setError,} = filmSlice.actions;
export default filmSlice.reducer;
