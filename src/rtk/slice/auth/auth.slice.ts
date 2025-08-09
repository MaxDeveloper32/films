import { createSlice } from '@reduxjs/toolkit';
import { userProfileApi } from '../../endpoints/user-auth/user-api.endpoint';

type AuthState = {
  isAuth: boolean;
  isLoading: boolean;
};

const initialState: AuthState = {
  isAuth: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userProfileApi.endpoints.registration.matchFulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
      })
      .addMatcher(userProfileApi.endpoints.getUser.matchFulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
