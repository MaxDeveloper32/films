import { configureStore } from '@reduxjs/toolkit';
import { filmsApi } from './endpoints/films/api/api';

import filmSlice, { setError } from './slice/films/films.slice';
import shoppingCart from './slice/shopping-cart/shopping-cart.slice';
import tableResult from './slice/table-result/table-result.slice';
import authSlice, { logout } from './slice/auth/auth.slice';

import { Middleware } from 'redux';
import { PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { userProfileApi } from './endpoints/user-auth/user-api.endpoint';

type ApiErrorType = {
  message: string;
};

const errorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: PayloadAction<ApiErrorType>) => {
    if (isRejectedWithValue(action)) {
      dispatch(setError({ message: action.payload.message }));
    }

    return next(action);
  };

const authMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    const result = next(action);

    if (userProfileApi.endpoints.getUser.matchRejected(action) && action.payload?.status === 401) {
      dispatch(logout());
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    film: filmSlice,
    cart: shoppingCart,
    result: tableResult,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      filmsApi.middleware,
      userProfileApi.middleware,
      errorMiddleware,
      authMiddleware
    ),
});
