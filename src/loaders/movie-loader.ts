import MovieData from "../models/movie-data";

export async function movieLoader(params: any) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=64e502b&i=${params.params.movieId}&plot=full`
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const responseJson = await response.json();
  const data: MovieData = {
    actors: responseJson.Actors,
    awards: responseJson.Awards,
    boxOffice: responseJson.BoxOffice,
    country: responseJson.Country,
    director: responseJson.Director,
    DVD: responseJson.DVD,
    genre: responseJson.Genre,
    imdbID: responseJson.imdbID,
    imdbRating: responseJson.imdbRating,
    imdbVotes: responseJson.imdbVotes,
    language: responseJson.Language,
    metascore: responseJson.Metascore,
    plot: responseJson.Plot,
    posterUrl: responseJson.Poster,
    production: responseJson.production,
    rated: responseJson.Rated,
    released: responseJson.Released,
    runtime: responseJson.Runtime,
    title: responseJson.Title,
    type: responseJson.Type,
    website: responseJson.Website,
    writer: responseJson.Writer,
    year: responseJson.Year,
  };

  const ratings: Array<{ Source: string; Value: string }> =
    responseJson.Ratings;
  if (ratings != null) {
    data.ratings = ratings
      .filter((item) => (item.Source !== "Internet Movie Database" ? 1 : 0))
      .map((item) => {
        return { source: item.Source, value: item.Value };
      });
  }
  return data;
}

export default movieLoader;
