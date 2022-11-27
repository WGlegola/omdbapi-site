type MovieData = {
  awards: string;
  title: string;
  year: number;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  posterUrl: string;
  ratings?: { source: string; value: string }[];
  metascore: number;
  imdbRating: number;
  imdbVotes: string;
  imdbID: string;
  type: string;
  DVD: string;
  boxOffice: string;
  production: string;
  website: string;
};

export default MovieData;
