import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Film, FilmDetails, PopularFilm } from '../../../../types/film.type';

type ApiErrorType = {
  message: string;
  type: string;
};

type Users = {
  id: number;
  name: string;
  result: number;
};

type ErrorMap = Record<number, ApiErrorType>;

const DEFAULT_ERROR_MESSAGES: ErrorMap = {
  400: { message: 'Неверный запрос', type: 'error' },
  401: { message: 'Не авторизован', type: 'warn' },
  403: { message: 'Доступ запрещен', type: 'warn' },
  404: { message: 'Ресурс не найден', type: 'error' },
  500: { message: 'Ошибка сервера', type: 'error' },
};

const findStatusError = (
  errorMessage: Record<number, ApiErrorType>,
  response: FetchBaseQueryError
) => {
  const status = typeof response.status === 'number' ? response.status : 500;
  const customMessage = errorMessage[status];
  const defaultError = DEFAULT_ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGES[500];

  return {
    message: customMessage ?? defaultError.message,
  };
};

const customMessages = {
  details: {
    404: { message: 'Не удалось загрузить популярные фильмы', type: 'error' },
    500: { message: 'Ошибка сервера', type: 'error' },
  },
};

const BASE_URL = 'https://api.example.com';

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getTableResult: builder.query<Users[], void>({
      query: () => '/table-result',
      providesTags: ['Users'],
    }),
    updateTableResult: builder.mutation({
      query: (body) => ({
        url: `/table-result`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Users'],
    }),

    getFilms: builder.query<Film[], void>({
      query: () => '/films',
    }),
    getPopularFilms: builder.query<PopularFilm[], void>({
      query: () => '/popular-films',
    }),

    getFilmsDetails: builder.query<FilmDetails, string>({
      query: (id) => `/films/${id}`,
      transformErrorResponse: (response) => {
        const err = findStatusError(customMessages.details, response);

        return {
          status: response.status,
          message: err.message,
          originalError: response.data,
        };
      },
    }),
    getFavorites: builder.query<Film[], void>({
      query: () => '/favorites',
    }),
    updateStatusFavorite: builder.mutation<Film, string>({
      query: (id) => ({
        url: `favorite/${id}`,
        method: 'PATCH',
      }),

      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const detailPatch = dispatch(
          filmsApi.util.updateQueryData('getFilms', undefined, (draft) => {
            const film = draft.find((item) => item.id === id);
            if (film) {
              film.isFavorite = !film.isFavorite;
            }
          })
        );

        const patchDetailsResult = dispatch(
          filmsApi.util.updateQueryData('getFilmsDetails', id, (draft) => {

            if (draft) {
              draft.isFavorite = !draft.isFavorite;
            }
          })
        );

        queryFulfilled.catch(() => {
          detailPatch.undo();
          patchDetailsResult.undo();
        });

        queryFulfilled.then(() => {
          dispatch(filmsApi.endpoints.getFavorites.initiate(undefined, { forceRefetch: true }));
        });
      },
    }),

    searchFilm: builder.query<Film[], string>({
      query: (name) => `search?q=${name}`,
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useUpdateStatusFavoriteMutation,
  useGetFavoritesQuery,
  useGetFilmsDetailsQuery,
  useGetPopularFilmsQuery,
  useSearchFilmQuery,
  useGetTableResultQuery,
  useUpdateTableResultMutation,
} = filmsApi;
