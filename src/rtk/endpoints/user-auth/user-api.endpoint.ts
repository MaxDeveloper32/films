import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterResponse, RegistrationUser } from '../../../types/film.type';


const BASE_URL = 'api/auth/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});


const userProfileApi = createApi({
  reducerPath: 'userProfileApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registration: builder.mutation<RegisterResponse, RegistrationUser>({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
    }),

    getUser: builder.query<RegistrationUser, void>({
      query: () => ({
        url: '/me',
      }),
      providesTags: ['User'],
    }),
  }),
});

export { userProfileApi };
export const { useRegistrationMutation, useGetUserQuery } = userProfileApi;
