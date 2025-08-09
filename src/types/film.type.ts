type Film = {
  previewImage: string;
  id: string;
  title: string;
  year: number;
  duration: number;
  genre: string;
  description: string;
  rating: number;
  isFavorite: boolean;
  top: boolean;
  ageRating: number;
}

type PopularFilm = Film &{
  age: number;
  top: boolean;
}

type FilmDetails = Film & {
  director: string;
  ageRating: number;
  country: string;
  releaseDate: string;
  actors: string[];
  writers: string[];
  genres: string[];
  fullDescription: string;
};


type RegistrationUser = {
  email: string;
  password: string;
  username?: string;
  image?: string;
  expiresInMins?:number
}

type RegisterResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    username?: string;
  };
};


export type { Film, FilmDetails, PopularFilm, RegistrationUser, RegisterResponse };
