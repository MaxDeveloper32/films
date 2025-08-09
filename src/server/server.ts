import { http, HttpResponse, delay } from 'msw';
import { setupWorker } from 'msw/browser';
import { Film, } from '../types/film.type';
import { mockFilm } from './mock';
import { mockDetailsFilms } from './details-mock';

let favorites: Film[] = [];

let users = [
  {
    id: 1,
    name: "Иван",
    result: 42

  },
  {
    id: 2,
    name: "Мария",
    result: 32
  },
  {
    id: 3,
    name: "Макс",
    result: 0
  },
];



type Users = {
  id: number;
  name: string;
  result: number;
};



const popularFilms = [...mockFilm].sort((a, b) => b.rating - a.rating).slice(0, 10);

const worker = setupWorker(

http.get('https://api.example.com/table-result', async () => {
    await delay(500);
    return HttpResponse.json(users, { status: 200 });
  }),

 http.post('https://api.example.com/table-result', async ({ request }) => {
  const updatedUser = (await request.json()) as Users;

  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return HttpResponse.json(users[index], { status: 200 });
  }

  return HttpResponse.json(users, { status: 404 });
}),

  http.get('https://api.example.com/films', async () => {
    await delay(500);
    return HttpResponse.json(mockFilm, { status: 200 });
  }),

  http.get('https://api.example.com/films/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    const details = mockDetailsFilms.find((film) => film.id === id);

    if (!details) {
      return HttpResponse.json({ message: 'Film not found', statusCode: 404 }, { status: 404 });
    }
    return HttpResponse.json(details, { status: 200 });
  }),

  http.get('https://api.example.com/popular-films', async () => {
    await delay(500);
    return HttpResponse.json(popularFilms, { status: 200 });
  }),

  http.patch('https://api.example.com/favorite/:id', async ({ params }) => {
    const { id } = params;
    await delay(300);


    const filmIndex = mockFilm.findIndex((film) => film.id === id);

    if (filmIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }


    mockFilm[filmIndex].isFavorite = !mockFilm[filmIndex].isFavorite;


    if (mockFilm[filmIndex].isFavorite) {
      favorites.push(mockFilm[filmIndex]);
    } else {
      favorites = favorites.filter((film) => film.id !== id);
    }

    return HttpResponse.json(mockFilm[filmIndex], { status: 200 });
  }),

  http.get('https://api.example.com/favorites', async () => {
    await delay(300);
    return HttpResponse.json(favorites, { status: 200 });
  }),


  http.get('https://api.example.com/search', async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    // Имитация задержки сети
    await delay(150);

    if (query === '') {
      return HttpResponse.json([]);
    }

    if (query === 'noresults') {
      return HttpResponse.json([]);
    }

    const results = mockFilm.filter((film) => film.title.toLowerCase().includes(query));

    return HttpResponse.json(results);
  })
);

export { worker };
