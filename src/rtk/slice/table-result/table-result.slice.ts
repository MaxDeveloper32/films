import { createSlice, } from '@reduxjs/toolkit';



type TableResult = {
  result: number;
};

const initialState: TableResult = {
  result: 0,
};

const tableResult = createSlice({
  name: 'table-result',
  initialState,
  reducers: {
    updatesResult (state, action) {
      state.result = action.payload
    }
  },
});

export const { updatesResult } = tableResult.actions;
export default tableResult.reducer

